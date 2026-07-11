const endpoint = import.meta.env.PUBLIC_APPS_SCRIPT_URL;

document.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!endpoint) {
      if (status) status.textContent = 'Formulário pronto. Configure PUBLIC_APPS_SCRIPT_URL para enviar ao Google Sheets.';
      return;
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const originalText = button?.textContent ?? '';
    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando...';
    }
    if (status) status.textContent = '';

    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form),
      });
      form.reset();
      if (status) status.textContent = 'Recebido. Em breve o material chega para você.';
    } catch {
      if (status) status.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
});
