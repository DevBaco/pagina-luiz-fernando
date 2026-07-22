const CONFIG = Object.freeze({
  sheetName: 'Leads',
  allowedOrigins: [
    'https://luizzcreeiss.com.br',
    'https://www.luizzcreeiss.com.br',
    'https://pagina-luiz-fernando.pages.dev',
  ],
});

const HEADERS = [
  'Recebido em',
  'Nome',
  'WhatsApp',
  'E-mail',
  'Origem',
  'Material',
  'Página',
];

function doGet() {
  return jsonResponse_({ ok: true, status: 'active' });
}

function doPost(event) {
  try {
    const parameters = event && event.parameter ? event.parameter : {};
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty('APPS_SCRIPT_SHARED_SECRET');
    const providedSecret = requiredValue_(parameters.sharedSecret, 'Chave de integração', 200);

    if (!expectedSecret || !secureEquals_(providedSecret, expectedSecret)) {
      throw new Error('Integração não autorizada.');
    }

    allowedParentOrigin_(parameters.pageUrl);
    requestToken_(parameters.requestToken);

    // Campo invisível: robôs costumam preenchê-lo; pessoas não.
    if (cleanValue_(parameters.company, 200)) return jsonResponse_({ ok: true });

    const lead = {
      name: requiredValue_(parameters.name, 'Nome', 120),
      whatsapp: requiredValue_(parameters.whatsapp, 'WhatsApp', 40),
      email: requiredValue_(parameters.email, 'E-mail', 254).toLowerCase(),
      source: cleanValue_(parameters.source, 100),
      guide: cleanValue_(parameters.guide, 200),
      pageUrl: cleanValue_(parameters.pageUrl, 500),
    };

    if (lead.name.length < 2) throw new Error('Nome inválido.');

    const whatsappDigits = lead.whatsapp.replace(/\D/g, '');
    if (!/^[1-9]{2}9\d{8}$/.test(whatsappDigits)) {
      throw new Error('WhatsApp inválido.');
    }
    lead.whatsapp = formatPhone_(whatsappDigits);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
      throw new Error('E-mail inválido.');
    }

    const spreadsheetId = properties.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('A propriedade SPREADSHEET_ID não foi configurada.');

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);

    try {
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      const sheet = getOrCreateSheet_(spreadsheet);

      sheet.appendRow([
        new Date(),
        safeCell_(lead.name),
        safeCell_(lead.whatsapp),
        safeCell_(lead.email),
        safeCell_(lead.source),
        safeCell_(lead.guide),
        safeCell_(lead.pageUrl),
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, message: publicErrorMessage_(error) });
  }
}

function getOrCreateSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function requiredValue_(value, label, maxLength) {
  const cleaned = cleanValue_(value, maxLength);
  if (!cleaned) throw new Error(label + ' é obrigatório.');
  return cleaned;
}

function cleanValue_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function secureEquals_(provided, expected) {
  const left = String(provided || '');
  const right = String(expected || '');
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return difference === 0;
}

function requestToken_(value) {
  const token = requiredValue_(value, 'Token do envio', 36);
  const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidV4Pattern.test(token)) throw new Error('Token do envio inválido.');
  return token;
}

function allowedParentOrigin_(pageUrl) {
  const value = cleanValue_(pageUrl, 500);
  const match = value.match(/^(https?):\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  if (!match) throw new Error('Origem do envio inválida.');

  const protocol = match[1].toLowerCase();
  const authority = match[2].toLowerCase();
  const hostname = authority.split(':')[0];
  const origin = protocol + '://' + authority;

  if (CONFIG.allowedOrigins.indexOf(origin) !== -1) return origin;

  if (
    protocol === 'https' &&
    /^[a-z0-9-]+\.pagina-luiz-fernando\.pages\.dev$/.test(hostname)
  ) {
    return origin;
  }

  if (
    protocol === 'http' &&
    (hostname === 'localhost' || hostname === '127.0.0.1')
  ) {
    return origin;
  }

  throw new Error('Origem do envio inválida.');
}

function safeCell_(value) {
  const cleaned = String(value || '');
  return /^[=+\-@]/.test(cleaned) ? "'" + cleaned : cleaned;
}

function formatPhone_(digits) {
  return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
}

function publicErrorMessage_(error) {
  const message = error && error.message ? String(error.message) : '';

  if (message === 'WhatsApp inválido.') {
    return 'Seu número está fora do formato. Use (DD) 9XXXX-XXXX.';
  }
  if (message === 'E-mail inválido.') {
    return 'Digite um e-mail válido, por exemplo: nome@email.com.';
  }
  if (message === 'Nome inválido.') {
    return 'Digite seu nome completo.';
  }

  return 'Não foi possível salvar seus dados. Tente novamente ou fale pelo WhatsApp.';
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
