const JSON_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
  'Content-Type': 'application/json; charset=UTF-8',
  'X-Content-Type-Options': 'nosniff',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });

const clean = (formData, name, maxLength) =>
  String(formData.get(name) || '').trim().slice(0, maxLength);

const isUuidV4 = (value) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

async function validateTurnstile(request, secret, token, requestToken) {
  const payload = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: requestToken,
  });
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) payload.set('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload,
  });

  if (!response.ok) return false;

  const result = await response.json();
  const requestHostname = new URL(request.url).hostname;
  const validHostname = !result.hostname || result.hostname === requestHostname;
  const validAction = !result.action || result.action === 'lead_form';
  return result.success === true && validHostname && validAction;
}

export async function onRequestPost({ request, env }) {
  try {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get('Origin');
    if (origin && origin !== requestUrl.origin) {
      return json({ ok: false, message: 'Origem do envio não permitida.' }, 403);
    }

    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > 20_000) {
      return json({ ok: false, message: 'Dados do formulário acima do limite permitido.' }, 413);
    }

    if (!env.TURNSTILE_SECRET || !env.APPS_SCRIPT_URL || !env.APPS_SCRIPT_SHARED_SECRET) {
      console.error('Missing lead form environment configuration.');
      return json({ ok: false, message: 'O formulário está temporariamente indisponível.' }, 503);
    }

    const formData = await request.formData();
    const honeypot = clean(formData, 'company', 200);
    if (honeypot) return json({ ok: true });

    const lead = {
      name: clean(formData, 'name', 120),
      whatsapp: clean(formData, 'whatsapp', 40),
      email: clean(formData, 'email', 254).toLowerCase(),
      source: clean(formData, 'source', 100),
      guide: clean(formData, 'guide', 200),
      pageUrl: clean(formData, 'pageUrl', 500),
      requestToken: clean(formData, 'requestToken', 36),
    };
    const turnstileToken = clean(formData, 'cf-turnstile-response', 2048);

    let submittedPage;
    try {
      submittedPage = new URL(lead.pageUrl);
    } catch {
      return json({ ok: false, message: 'Origem do envio inválida.' }, 400);
    }

    if (submittedPage.origin !== requestUrl.origin) {
      return json({ ok: false, message: 'Origem do envio inválida.' }, 400);
    }
    if (lead.name.length < 2) {
      return json({ ok: false, message: 'Digite seu nome.' }, 400);
    }
    if (!/^[1-9]{2}9\d{8}$/.test(lead.whatsapp.replace(/\D/g, ''))) {
      return json({ ok: false, message: 'Seu número está fora do formato. Use (DD) 9XXXX-XXXX.' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
      return json({ ok: false, message: 'Digite um e-mail válido, por exemplo: nome@email.com.' }, 400);
    }
    if (!isUuidV4(lead.requestToken) || !turnstileToken) {
      return json({ ok: false, message: 'Conclua a verificação de segurança e tente novamente.' }, 400);
    }

    const challengeIsValid = await validateTurnstile(
      request,
      env.TURNSTILE_SECRET,
      turnstileToken,
      lead.requestToken,
    );
    if (!challengeIsValid) {
      return json({ ok: false, message: 'A verificação de segurança expirou ou não foi aceita. Tente novamente.' }, 400);
    }

    const upstreamBody = new URLSearchParams({
      ...lead,
      sharedSecret: env.APPS_SCRIPT_SHARED_SECRET,
    });
    const upstream = await fetch(env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: upstreamBody,
      redirect: 'follow',
    });
    const upstreamResult = await upstream.json().catch(() => null);

    if (!upstream.ok || !upstreamResult?.ok) {
      console.error('Apps Script rejected lead submission.', upstream.status);
      return json({
        ok: false,
        message: upstreamResult?.message || 'Não foi possível salvar seus dados. Tente novamente ou fale pelo WhatsApp.',
      }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error('Lead form request failed.', error);
    return json({ ok: false, message: 'Não foi possível salvar seus dados. Tente novamente ou fale pelo WhatsApp.' }, 500);
  }
}
