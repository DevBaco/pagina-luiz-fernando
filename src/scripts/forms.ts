import IMask from 'imask';

const thankYouUrl = '/obrigado/';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const loader = document.querySelector<HTMLElement>('.preloader');

declare global {
  interface Window {
    turnstile?: {
      reset: (widget?: HTMLElement | string) => void;
    };
  }
}

const setSubmissionLoading = (isLoading: boolean) => {
  loader?.classList.toggle('is-submitting', isLoading);
  document.body.classList.toggle('form-submitting', isLoading);
};

document.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const pageUrl = form.querySelector<HTMLInputElement>('[data-page-url]');
  const requestToken = form.querySelector<HTMLInputElement>('[data-request-token]');
  const name = form.querySelector<HTMLInputElement>('input[name="name"]');
  const phone = form.querySelector<HTMLInputElement>('input[name="whatsapp"]');
  const email = form.querySelector<HTMLInputElement>('input[name="email"]');
  const nameError = form.querySelector<HTMLElement>('[data-name-error]');
  const phoneError = form.querySelector<HTMLElement>('[data-phone-error]');
  const emailError = form.querySelector<HTMLElement>('[data-email-error]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const originalButtonText = button?.textContent ?? '';
  const turnstileContainer = form.querySelector<HTMLElement>('[data-turnstile-container]');
  const phoneMask = phone
    ? IMask(phone, {
        mask: '(00) 00000-0000',
        lazy: true,
      })
    : null;

  const validatePhone = () => {
    if (!phone || !phoneMask) return true;
    const digits = phoneMask.unmaskedValue;
    let errorMessage = '';

    if (digits.length !== 11) {
      errorMessage = 'Digite um celular válido no formato (DD) 9XXXX-XXXX.';
    } else if (digits.charAt(2) !== '9') {
      errorMessage = 'Seu número está fora do formato. Depois do DDD, o celular deve começar com 9.';
    }

    const isValid = errorMessage === '';
    phone.setCustomValidity(errorMessage);
    phone.classList.toggle('is-invalid', !isValid);
    phone.setAttribute('aria-invalid', String(!isValid));
    if (phoneError) phoneError.textContent = errorMessage;
    return isValid;
  };

  const validateName = () => {
    if (!name) return true;
    const isValid = name.value.trim().length >= 2;
    const errorMessage = isValid ? '' : 'Digite seu nome.';
    name.setCustomValidity(errorMessage);
    name.classList.toggle('is-invalid', !isValid);
    name.setAttribute('aria-invalid', String(!isValid));
    if (nameError) nameError.textContent = errorMessage;
    return isValid;
  };

  const validateEmail = () => {
    if (!email) return true;
    const isValid = emailPattern.test(email.value.trim());
    const errorMessage = isValid ? '' : 'Digite um e-mail válido, por exemplo: nome@email.com.';
    email.setCustomValidity(errorMessage);
    email.classList.toggle('is-invalid', !isValid);
    email.setAttribute('aria-invalid', String(!isValid));
    if (emailError) emailError.textContent = errorMessage;
    return isValid;
  };

  name?.addEventListener('input', () => {
    name.setCustomValidity('');
    name.classList.remove('is-invalid');
    name.setAttribute('aria-invalid', 'false');
    if (nameError) nameError.textContent = '';
  });
  name?.addEventListener('blur', validateName);
  phoneMask?.on('accept', () => {
    phone?.setCustomValidity('');
    phone?.classList.remove('is-invalid');
    phone?.setAttribute('aria-invalid', 'false');
    if (phoneError) phoneError.textContent = '';
    if (phoneMask.unmaskedValue.length === 11) validatePhone();
  });
  phone?.addEventListener('blur', validatePhone);
  email?.addEventListener('input', () => {
    email.setCustomValidity('');
    email.classList.remove('is-invalid');
    email.setAttribute('aria-invalid', 'false');
    if (emailError) emailError.textContent = '';
  });
  email?.addEventListener('blur', validateEmail);
  button?.addEventListener('click', () => {
    validateName();
    validatePhone();
    validateEmail();
  });

  if (pageUrl) pageUrl.value = window.location.href;
  let timeoutId: number | undefined;

  const finishSubmission = (message: string, resetChallenge = true) => {
    if (timeoutId) window.clearTimeout(timeoutId);
    setSubmissionLoading(false);
    if (button) {
      button.disabled = false;
      button.textContent = originalButtonText;
    }
    if (status) status.textContent = message;
    if (resetChallenge && window.turnstile) {
      window.turnstile.reset(turnstileContainer || undefined);
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      form.querySelector<HTMLElement>('.form-control.is-invalid')?.focus();
      return;
    }

    const turnstileToken = form.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value;
    if (!turnstileToken) {
      if (status) status.textContent = 'Conclua a verificação de segurança antes de enviar.';
      return;
    }

    if (requestToken) requestToken.value = crypto.randomUUID();
    if (pageUrl) pageUrl.value = window.location.href;

    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando...';
    }
    if (status) status.textContent = 'Salvando seus dados...';
    setSubmissionLoading(true);

    const controller = new AbortController();
    if (timeoutId) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
        credentials: 'omit',
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'Não foi possível salvar seus dados. Tente novamente ou fale pelo WhatsApp.');
      }

      if (timeoutId) window.clearTimeout(timeoutId);
      if (status) status.textContent = 'Dados recebidos. Redirecionando...';
      window.location.assign(thankYouUrl);
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === 'AbortError'
          ? 'O envio demorou mais que o esperado. Tente novamente.'
          : error instanceof Error
            ? error.message
            : 'Não foi possível salvar seus dados. Tente novamente ou fale pelo WhatsApp.';
      finishSubmission(message);
    }
  });
});
