# Site Luiz Reis

Projeto Astro estatico baseado no template Revoza.

## Comandos

```sh
npm install
npm run dev
npm run build
```

## Formulario

Configure `PUBLIC_APPS_SCRIPT_URL` em `.env` com a URL publicada do Google Apps Script que recebera os leads e gravara no Sheets.

O código do Apps Script e o passo a passo de publicação estão em [`google-apps-script/`](./google-apps-script/README.md). Depois de salvar o lead, o site redireciona a pessoa para a página de agradecimento.
