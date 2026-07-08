# Central de Vendas — UNIFATECIE

Ferramenta interna para a equipe de vendas encontrar rapidamente o texto padrão de cada curso/campanha, sem precisar procurar manualmente nos regulamentos.

- **Vendedor** (`/`): digita o curso, recebe o texto pronto pra colar no WhatsApp, com botão de copiar. Tem também um assistente de IA (chat) para buscas em linguagem informal.
- **Admin** (`/admin/login.html`): cadastra cursos, campanhas e preços; e tem uma tela de importação assistida por IA para acelerar o cadastro a partir do texto dos regulamentos (sempre com revisão humana antes de salvar).

Importante: os valores e textos mostrados ao vendedor **nunca são gerados livremente pela IA**. Eles vêm sempre do banco de dados cadastrado no admin. A IA só ajuda a *encontrar* o curso certo (no chat) ou a *rascunhar* o cadastro (na importação) — mas nada é salvo ou exibido sem passar pelos dados reais.

## Rodando localmente

Pré-requisito: Node.js 20+ instalado.

```bash
npm install
cp .env.example .env
# edite o .env: defina ADMIN_EMAIL, ADMIN_PASSWORD e (opcional) ANTHROPIC_API_KEY
npm run seed    # popula 3 cursos de exemplo, só na primeira vez
npm start
```

Acesse `http://localhost:3000`. O admin cadastrado (`ADMIN_EMAIL`/`ADMIN_PASSWORD` do `.env`) é criado automaticamente na primeira vez que o servidor sobe.

### Chave da Anthropic (para o chat e a importação com IA)

O buscador simples (tela principal) funciona **sem** nenhuma chave de API. Só o chat de IA (`/api/chat`) e a importação assistida (`/admin/api/import/extract`) precisam de `ANTHROPIC_API_KEY`, obtida em [console.anthropic.com](https://console.anthropic.com). Sem a chave configurada, esses dois recursos retornam um erro amigável explicando o que falta — o resto do site continua funcionando normalmente.

## Onde ficam os dados

Tudo fica em um único arquivo `data/app.json` (formato JSON, sem precisar instalar banco de dados nenhum). Para fazer backup, basta copiar esse arquivo.

## Deploy na HostGator

A HostGator moderna oferece **"Setup Node.js App"** no cPanel, que é o caminho recomendado:

1. No cPanel, abra **Setup Node.js App** → **Create Application**.
2. Escolha a versão do Node (20 ou mais recente).
3. **Application root**: a pasta onde você vai enviar os arquivos deste projeto (ex: `bot-vendas`, fora do `public_html` se possível).
4. **Application startup file**: `server.js`.
5. Na seção **Environment variables**, adicione: `ANTHROPIC_API_KEY`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (os mesmos que estariam no `.env`).
6. Envie os arquivos do projeto via **File Manager** ou FTP/Git para o "application root" configurado (não precisa enviar `node_modules`).
7. Clique em **Run NPM Install** na tela do Setup Node.js App.
8. Confirme que a pasta `data/` tem permissão de escrita (o app cria `data/app.json` sozinho na primeira execução).
9. Inicie/reinicie a aplicação pelo próprio painel. A HostGator vai te dar a URL/porta interna e cuidar do proxy para o seu domínio.

### Se o seu plano não tiver Node.js

Alguns planos de entrada da HostGator só suportam PHP. Nesse caso, o mesmo projeto roda sem nenhuma alteração em qualquer serviço Node gratuito/barato, por exemplo [Render](https://render.com) ou [Railway](https://railway.app):

1. Suba este projeto num repositório Git (GitHub, por exemplo).
2. Crie um "Web Service" no Render/Railway apontando pro repositório, comando de start `npm start`.
3. Configure lá as mesmas variáveis de ambiente (`ANTHROPIC_API_KEY`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
4. No painel de DNS da HostGator, crie um subdomínio (ex: `vendas.suaunifatecie.com.br`) do tipo CNAME apontando para a URL que o Render/Railway te der. O site fica acessível pelo seu próprio domínio mesmo hospedado em outro lugar.

## Uso do dia a dia (equipe de vendas)

1. Acesse o site, digite o nome do curso na busca.
2. Clique no resultado certo → o texto padrão aparece pronto.
3. Clique em "Copiar texto" e cole no WhatsApp/Instagram.
4. Se não souber o nome exato, use o botão de chat (🗨️) no canto da tela e descreva o curso com suas palavras.

## Uso do admin (cadastro de cursos)

1. Entre em `/admin/login.html` com o e-mail/senha configurados.
2. Em **Campanhas**, cadastre a campanha vigente (nome, validade, texto de bônus se houver).
3. Em **Cursos**, cadastre o curso e depois clique em **Preços** para definir os valores daquele curso na campanha.
4. Para acelerar o cadastro de muitos cursos a partir dos PDFs de regulamento, use **Importar (IA)**: cole o texto do regulamento, clique em "Extrair dados com IA", revise/corrija os campos (a IA deixa em branco o que não achou explícito no texto — nunca inventa número) e clique em "Salvar curso".
