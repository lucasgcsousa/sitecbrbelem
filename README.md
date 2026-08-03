# Igreja CBR Barão

Site institucional em React + Vite para a Igreja CBR Barão.

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: inicia o servidor local.
- `npm run build`: gera a versão de produção em `dist/`.
- `npm run lint`: roda a checagem de código com ESLint.
- `npm run preview`: serve a build localmente para revisão.
- `npm run update:social`: atualiza os dados das seções de Instagram e YouTube.

## Supabase

Os cadastros de profissionais do reino usam a tabela `kingdom_professionals`.

1. Crie um projeto no Supabase.
2. Rode o SQL de `supabase/kingdom_professionals.sql` no SQL Editor do Supabase.
3. Copie `.env.example` para `.env.local`.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os dados do projeto.
5. Configure essas mesmas variáveis no ambiente de produção.

## Conteúdo para personalizar

Os textos, horários, links de redes sociais e blocos da página ficam em `src/App.jsx`.
As seções "No Instagram" e "Últimas mensagens" usam `src/data/socialMedia.json`.
Os estilos principais ficam em `src/App.css` e `src/index.css`.

## Atualização automática de mídias

O workflow `.github/workflows/update-social-media.yml` roda todos os dias às 08:00 de Belém/São Paulo e também pode ser executado manualmente pelo GitHub Actions.

- YouTube: atualizado pelo feed público do canal `@cbrbarao3012`.
- Instagram: requer os secrets `IG_USER_ID` e `IG_GRAPH_ACCESS_TOKEN` configurados no repositório do GitHub.
- Quando houver mudança, o workflow commita `src/data/socialMedia.json` e novas imagens em `public/social`.
- Deploy na Vercel pelo workflow: configure também `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`. Se a integração Git da Vercel já estiver ativa, o deploy também pode acontecer automaticamente pelo push.

## Créditos de imagem

A imagem principal foi baixada do Unsplash:
https://unsplash.com/photos/people-raising-hands-in-a-worship-service-SfGalIOhZ6Q

Foto por AMONWAT DUMKRUT, livre para uso sob a Unsplash License.
