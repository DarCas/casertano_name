# casertano.name

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=nextdotjs&style=for-the-badge)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&style=for-the-badge)](https://tailwindcss.com/)
[![Static](https://img.shields.io/badge/Output-Static%20Export-green?style=for-the-badge)](https://nextjs.org/docs/app/api-reference/next-config-js/output)
![Lighthouse](https://img.shields.io/badge/Lighthouse-A11y%20100%20%7C%20SEO%20100-brightgreen?style=for-the-badge)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-yellow?style=for-the-badge)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Static portfolio for Dario Casertano — Senior Full Stack Engineer. Built with Next.js 15 App Router, Tailwind CSS v3, and TypeScript. Static export served via Nginx or Docker.

## Structure

```
├── app/            # App Router pages (homepage, /privacy, /projects)
├── components/     # React components (Nav, Hero, Projects, Skills, Tag, Contact …)
├── content/        # Project data (projects.json)
├── api/            # Express backend for the contact form (sends via Nodemailer)
├── lib/            # Types and utilities
├── public/         # Favicons, Apple touch icon, robots.txt, sitemap.xml
├── out/            # Static build output
├── Dockerfile      # Multi-stage build: Next.js → Nginx
├── nginx.conf      # Nginx configuration (SPA fallback + /api/ proxy)
└── docker-compose.yml
```

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server on :3000
npm run build      # static export → /out/
npm run lint       # Next.js built-in lint
```

`npm run start` is unused — `next start` is incompatible with static export (`output: "export"`).

## Deploy

**Docker**

```bash
docker compose up -d
```

Nginx serves `/out/` and proxies `/api/` to the api container.

**api** (runs as a separate Node.js process on deploy)

```bash
npm install --prefix api && npm run build --prefix api && npm start --prefix api
```

Requires SMTP environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `TO_EMAIL`, plus `TURNSTILE_SECRET_KEY`.

## Design Tokens

| Token | Value |
|-------|-------|
| `bg` | `#0A0A0B` |
| `bg-surface` | `#141416` |
| `text` | `#EDEDEF` |
| `text-secondary` | `#888890` |
| `accent` | `#6C63FF` |
| `accent-secondary` | `#00D4AA` |

Fonts: Plus Jakarta Sans (body) and JetBrains Mono (mono/display), loaded via `next/font/google` in `app/layout.tsx` with CSS variables.

## Constraints

- `output: "export"` — all pages are fully static; `revalidate` is dead code
- Images use `unoptimized: true`
- Social links are inline SVGs (no icon font)
- `prefers-reduced-motion` disables all animations
- `EmailLink` component sets `mailto:` via `useEffect` after hydration (empty during SSR to prevent scraping)
- Sections use `scroll-mt-[72px]` for the fixed nav offset

## Known

- Contact form is client-side only (fetches `POST /api/contact`)
- No tests or testing framework configured

## License

Copyright © 2026 Casertano Dario. All rights reserved.

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.
