const CONFIG = Object.freeze({
  sheetName: 'Leads',
  whatsappNumber: '5531985556001',
  whatsappMessage: 'Olá, Luiz. Acabei de preencher o formulário do site e quero continuar pelo WhatsApp.',
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
  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Formulário ativo</title></head><body><p>Formulário ativo.</p></body></html>',
  );
}

function doPost(event) {
  let requestToken = '';

  try {
    const parameters = event && event.parameter ? event.parameter : {};
    requestToken = requiredValue_(parameters.requestToken, 'Token do envio', 100);

    // Campo invisível: robôs costumam preenchê-lo; pessoas não.
    if (cleanValue_(parameters.company, 200)) return successPage_(requestToken);

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

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
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

    return successPage_(requestToken);
  } catch (error) {
    console.error(error);
    return errorPage_(requestToken, publicErrorMessage_(error));
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

function whatsappUrl_() {
  return (
    'https://wa.me/' +
    CONFIG.whatsappNumber +
    '?text=' +
    encodeURIComponent(CONFIG.whatsappMessage)
  );
}

function successPage_(requestToken) {
  const url = whatsappUrl_();
  const payload = JSON.stringify({ type: 'lead-saved', token: requestToken });

  return HtmlService.createHtmlOutput(
    '<!doctype html>' +
      '<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_top">' +
      '<title>Contato recebido</title></head><body>' +
      '<p>Contato recebido.</p>' +
      '<p><a href="' + url + '" target="_top">Continuar no WhatsApp</a></p>' +
      '<script>window.top.postMessage(' + payload + ', "*");<\/script>' +
      '</body></html>',
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function errorPage_(requestToken, publicMessage) {
  const url = whatsappUrl_();
  const payload = JSON.stringify({ type: 'lead-error', token: requestToken, message: publicMessage });

  return HtmlService.createHtmlOutput(
    '<!doctype html>' +
      '<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_top">' +
      '<title>Não foi possível salvar</title></head><body>' +
      '<h1>Não foi possível salvar seus dados.</h1>' +
      '<p>Você ainda pode continuar o atendimento diretamente pelo WhatsApp.</p>' +
      '<p><a href="' + url + '" target="_top">Falar no WhatsApp</a></p>' +
      '<script>window.top.postMessage(' + payload + ', "*");<\/script>' +
      '</body></html>',
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
