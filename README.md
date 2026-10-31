# Meridian Integrations

Local SEO and technical growth site for Meridian Integrations, a Denver agency. The app is Next.js 16 with the App Router and is built as a static export for Cloudflare Pages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lint

```bash
npm run lint
```

ESLint uses `eslint-config-next` 16.4.3, the same release as the installed Next.js version.

## Production build

```bash
npm run build
```

`next.config.ts` sets `output: "export"`. The build writes a static site to `out/`. Do not use `npm run start` for this project. That command expects a Node server, and this site is exported HTML, CSS, and JavaScript.

## Cloudflare Pages

Use the existing GitHub connection. Suggested settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js | 20 or newer |

Leave `output: "export"` in place. The city and industry routes are pre-rendered from `generateStaticParams`, so they are included in `out/` without a server.

## Routes

| Path | Source |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/local-seo/[slug]` | `src/data/denverMetro.ts` |
| `/seo/[slug]` | `src/data/industries.ts` |
