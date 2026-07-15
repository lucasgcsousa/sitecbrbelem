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

## Supabase

Os cadastros de profissionais do reino usam a tabela `kingdom_professionals`.

1. Crie um projeto no Supabase.
2. Rode o SQL de `supabase/kingdom_professionals.sql` no SQL Editor do Supabase.
3. Copie `.env.example` para `.env.local`.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os dados do projeto.
5. Configure essas mesmas variáveis no ambiente de produção.

## Conteúdo para personalizar

Os textos, horários, links de redes sociais e blocos da página ficam em `src/App.jsx`.
Os estilos principais ficam em `src/App.css` e `src/index.css`.

## Créditos de imagem

A imagem principal foi baixada do Unsplash:
https://unsplash.com/photos/people-raising-hands-in-a-worship-service-SfGalIOhZ6Q

Foto por AMONWAT DUMKRUT, livre para uso sob a Unsplash License.
