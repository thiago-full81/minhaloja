# MinhaLoja

SPA de e-commerce em React, TypeScript e Vite, com catálogo REST, painel administrativo, validação de formulários e carrinho com checkout simulado pelo WhatsApp.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Executar localmente

Instale as dependências e inicie a API e a aplicação em terminais separados:

```bash
npm install
npm run api
npm run dev
```

A API JSON Server serve `db.json` em `http://localhost:3000`; a aplicação Vite informa seu endereço no terminal. Use `npm run typecheck`, `npm run lint` e `npm run build` para validar o projeto.

## Configuração

Crie um arquivo `.env` na raiz quando precisar alterar os endereços padrão:

```dotenv
VITE_API_URL=http://192.168.15.1:3000
VITE_STORE_PHONE=+55819886469730
```

O telefone deve conter código do país e DDD, somente números. A configuração padrão fica em `src/config/appConfig.ts`.

## Rotas

- `/`: vitrine de produtos.
- `/products/:id`: detalhes do produto.
- `/carrinho`: itens, quantidades, totais e finalização pelo WhatsApp.
- `/admin`: listagem e exclusão de produtos.
- `/admin/novo`: cadastro.
- `/admin/:id/editar`: edição.

Os preços são mantidos pela API em centavos inteiros. O formulário recebe valores em reais e converte para centavos ao salvar.
