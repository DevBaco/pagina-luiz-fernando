# Formulário seguro no Google Sheets

O navegador envia o formulário para uma Pages Function no mesmo domínio. A Function valida o Cloudflare Turnstile e só então encaminha os dados ao Apps Script usando uma chave secreta compartilhada. O Apps Script salva a linha na aba `Leads`.

## 1. Criar e configurar a planilha

1. Na conta Google do projeto, crie uma planilha.
2. Copie da URL o trecho entre `/d/` e `/edit`: esse é o ID da planilha.
3. Abra **Extensões > Apps Script**.
4. Substitua o conteúdo inicial pelo conteúdo de [`Code.gs`](./Code.gs).
5. Gere uma senha aleatória longa, com pelo menos 32 caracteres, para ser a chave compartilhada.
6. Em **Configurações do projeto > Propriedades do script**, adicione:
   - `SPREADSHEET_ID`: ID da planilha;
   - `APPS_SCRIPT_SHARED_SECRET`: senha aleatória gerada no passo anterior.

A aba `Leads` e os cabeçalhos serão criados automaticamente no primeiro envio válido.

## 2. Publicar o Apps Script

1. Clique em **Implantar > Nova implantação**.
2. Escolha **Aplicativo da Web**.
3. Em **Executar como**, escolha **Eu**.
4. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
5. Autorize o acesso e copie a URL terminada em `/exec`.

Não use a URL `/dev`. Depois que tudo estiver funcionando, remova implantações antigas para que a URL anteriormente exposta no site deixe de funcionar.

## 3. Criar o Turnstile

1. No painel da Cloudflare, abra **Turnstile** e crie um widget do tipo **Managed**.
2. Autorize `luizzcreeiss.com.br`, `www.luizzcreeiss.com.br` e `pagina-luiz-fernando.pages.dev`.
3. Copie a **Site Key** e a **Secret Key**. A Site Key é pública; a Secret Key nunca deve ir para o código ou para variáveis `PUBLIC_*`.

## 4. Configurar o Cloudflare Pages

Em **Workers & Pages > pagina-luiz-fernando > Settings > Variables and Secrets**, configure para Production:

- `PUBLIC_TURNSTILE_SITE_KEY`: Site Key pública do Turnstile;
- `TURNSTILE_SECRET`: Secret Key do Turnstile, marcada como secreta;
- `APPS_SCRIPT_URL`: URL `/exec`, marcada como secreta;
- `APPS_SCRIPT_SHARED_SECRET`: a mesma senha salva nas propriedades do Apps Script, marcada como secreta.

Repita em Preview apenas se quiser que os formulários dos previews também gravem leads. Depois, inicie um novo deploy para incorporar a Site Key ao build.

## 5. Desenvolvimento local

O arquivo `.env.development` usa as chaves oficiais de teste do Turnstile. Para executar também a Pages Function localmente, copie `.dev.vars.example` para `.dev.vars`, preencha a URL do Apps Script e a chave compartilhada e rode o projeto com o ambiente local do Cloudflare Pages.

As chaves oficiais de teste não devem ser usadas no deploy de produção.

## 6. Testar e atualizar

1. Envie um formulário no site publicado.
2. Confirme a nova linha na aba `Leads`.
3. Confirme o redirecionamento para `/obrigado/` e o botão do WhatsApp.

Sempre que alterar `Code.gs`, abra **Implantar > Gerenciar implantações > Editar**, selecione **Nova versão** e implante novamente. A URL `/exec` da implantação pode continuar igual.
