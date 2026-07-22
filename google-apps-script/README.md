# Formulário do site no Google Sheets

O formulário envia nome, WhatsApp, e-mail, origem, material e URL da página. O Apps Script salva os dados na aba `Leads` e confirma o salvamento ao site. Somente depois dessa confirmação o site abre o WhatsApp `55 31 98555-6001`.

## 1. Criar e configurar a planilha

1. Na nova conta Google, crie uma planilha.
2. Copie o ID da URL. Em `https://docs.google.com/spreadsheets/d/1lwe2A6L58bWlyDJbRTX0zGxNT7A7V2B4xSW5b4w70rc/edit`, o ID é o trecho entre `/d/` e `/edit`.
3. Na planilha, abra **Extensões > Apps Script**.
4. Apague o conteúdo inicial de `Code.gs` e cole o conteúdo de [`Code.gs`](./Code.gs).
5. Abra **Configurações do projeto > Propriedades do script**.
6. Adicione a propriedade `SPREADSHEET_ID` com o ID copiado no passo 2.

A aba `Leads` e seus cabeçalhos serão criados automaticamente no primeiro envio.

## 2. Publicar como aplicativo da Web

1. Clique em **Implantar > Nova implantação**.
2. Em **Selecionar tipo**, escolha **Aplicativo da Web**.
3. Em **Executar como**, escolha **Eu**.
4. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
5. Clique em **Implantar**, autorize o acesso à planilha e copie a URL terminada em `/exec`.

Não use a URL de teste terminada em `/dev`, pois ela só funciona para editores do script.

## 3. Conectar ao Cloudflare Pages

1. No projeto do Cloudflare Pages, abra **Settings > Variables and Secrets**.
2. Crie `PUBLIC_APPS_SCRIPT_URL` com a URL `/exec` copiada acima.
3. Marque a variável para **Production** e, se quiser testar previews, também para **Preview**.
4. Faça um novo deploy do site. Essa variável é incorporada durante o build do Astro.

## 4. Testar

1. Preencha o formulário publicado.
2. Confirme que uma linha apareceu na aba `Leads`.
3. Confirme que, depois do salvamento, o navegador abriu o WhatsApp.

Ao alterar o `Code.gs`, publique uma nova versão em **Implantar > Gerenciar implantações > Editar > Nova versão** para atualizar a URL `/exec` existente.
