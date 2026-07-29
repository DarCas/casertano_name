# casertano.name

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&style=for-the-badge)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=nextdotjs&style=for-the-badge)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&style=for-the-badge)](https://tailwindcss.com/)
[![Static Export](https://img.shields.io/badge/Output-Static%20Export-green?style=for-the-badge)](https://nextjs.org/docs/app/api-reference/next-config-js/output)
![Lighthouse](https://img.shields.io/badge/Lighthouse-A11y%20100%20%7C%20SEO%20100-brightgreen?style=for-the-badge)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-yellow?style=for-the-badge)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

Static portfolio for Dario Casertano. Requires **Node.js 22**.

## Quick start

```bash
cp .env.example .env          # configure env vars (also used by Docker Compose)
npm install
npm run dev                    # frontend :3000
```

For local dev without Docker, `cp .env.example .env.local` works too — Next.js auto-loads `.env.local`.

- Frontend: Next.js 15 App Router, `output: "export"` → `/out/`
- API: Express in `api/`, dev via `npm run dev --prefix api` (port 3001, hot-reload via tsx)
- Project media: place images/video in `api/@storage/images/projects/<slug>.<ext>`. API serves them at `/images/projects/<file>?<mtime>` with automatic cache-busting.

## Environment variables

Copy `.env.example` to `.env` (Docker will read it). The API loads the same file via `--env-file`.
`NEXT_PUBLIC_CONTACT_EMAIL` doubles as `TO_EMAIL` for the API — single source.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API` | No | Base URL for the API (default: `/api` — same origin) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key (senza, captcha disabilitato) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact email; when absent, hides contact form and email link |
| `NEXT_PUBLIC_NAME` | No | Name shown in footer |
| `NEXT_PUBLIC_VAT` | No | VAT / fiscal info shown in footer |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | No | LinkedIn URL; shows icon when set |
| `NEXT_PUBLIC_SOCIAL_GITHUB` | No | GitHub URL; shows icon when set |
| `NEXT_PUBLIC_SOCIAL_TELEGRAM` | No | Telegram URL; shows icon when set |
| `TURNSTILE_SECRET_KEY` | No / API | Turnstile server-side verification (senza, verifica saltata) |
| `CORS_ORIGIN` | No / API | Origini consentite (default: `http://localhost:3000`) |
| `PORT` | No / API | Porta Express (default: 3001) |
| `SMTP_HOST` | No / API | SMTP server (default: localhost) |
| `SMTP_PORT` | No / API | SMTP port (default: 587) |
| `SMTP_SECURE` | No / API | TLS (default: false) |
| `SMTP_USER` | No / API | SMTP user |
| `SMTP_PASS` | No / API | SMTP password |

## Design tokens

| Token | Value |
|---|---|
| `bg` | `#0A0A0B` |
| `bg-surface` | `#141416` |
| `text` | `#EDEDEF` |
| `text-secondary` | `#888890` |
| `accent` | `#6C63FF` |
| `accent-secondary` | `#00D4AA` |

Fonts: Plus Jakarta Sans (body) + JetBrains Mono (mono), loaded via `next/font/google`.

## Deploy

**Docker** (pre-built image)

```bash
docker compose up -d
```

To build your own image, create `.env.build` with `NEXT_PUBLIC_*` vars first:
```bash
docker build -t ghcr.io/username/package_name:latest .
docker push ghcr.io/username/package_name:latest
```

Express serves `/out/` (static site) and `/api/*` (API routes) on port 3001.
Project media from `api/@storage/images/projects/` is bind-mounted into the container and served at `/images/projects/`.

The site is accessible at `localhost:3001`.

**Standalone API**

```bash
npm install --prefix api && npm run build --prefix api && npm start --prefix api
```

## Constraints

- Static export — `next start` is unused
- Images: `unoptimized: true`
- `prefers-reduced-motion` disables all animations
- `EmailLink` sets `mailto:` via `useEffect` after hydration (anti-scrape)
- Contact form is client-side only (no SSR), rate-limited (5 req/15min)
- Express serves both static `/out/` and `/api/*` on single port
- No tests configured

## License

Copyright &copy; 2026 Casertano Dario.

Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
