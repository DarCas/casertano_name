# AGENTS.md — casertano.name

Static portfolio for Dario Casertano. Next.js 15 App Router, Tailwind CSS v3, TypeScript. `output: "export"` → `/out/`.

## Commands

```bash
npm install       # install deps
npm run dev       # dev server :3000
npm run build     # static export → /out/ (RUN ONLY ON REQUEST)
npm run lint      # Next.js built-in lint (broken — no ESLint config)
```

`npm run start` is dead — `next start` needs a Node server, incompatible with static export. No tests.
`NEXT_PUBLIC_CONTACT_EMAIL` doubles as API recipient env — when absent, contact form and email link are hidden.
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is optional — when absent, Turnstile captcha is disabled (dev mode).
The API reads from the same `.env` via `--env-file` (dev) or from Docker Compose.

## Deploy

- **Docker**: `docker compose up -d` — Nginx serves `/out/`, proxies `/api/` to api.
- **api** (deploy only): `npm install --prefix api && npm run build --prefix api && npm start --prefix api`. Requires SMTP env vars in root `.env`.

## Architecture

- **`app/`** — 3 routes: `page.tsx` (homepage), `privacy/page.tsx`, `not-found.tsx` (glitch 404). All static.
- **`components/`** — 11 files: Nav, Hero, Projects, ProjectCard, ProjectModal, Skills, Tag, Contact, EmailLink, Footer, NetworkBg. `<Tag>` centralizes tag styling with `animate-tagHeroGlow` and staggered delays.
- **`content/projects.json`** — project data. Typed via `Project` in `lib/projects.ts` with `features: string[]`.
- **`lib/`** — `projects.ts` (types) + `utils.ts` (`hashDelay` only).
- **`api/`** — separate Express app (own `package.json` + `tsconfig.json`). `POST /api/contact` validates via Zod, rate-limited (5 req/15min), sends via Nodemailer. CORS configurato via `CORS_ORIGIN`. Builds with `tsc` to `dist/`, runs via `node dist/index.js`. Excluded from root `tsconfig.json` `exclude`.
- **`api/src/templates/contact-email.ts`** — HTML email template, HTML-escaped with `\n` → `<br>` conversion.
- **`app/globals.css`** — all styles. CSS custom properties for design tokens + custom scrollbar styling (thin, dark, accent thumb).
- **`public/`** — `favicon.svg`, `apple-touch-icon.svg`, `robots.txt`, `sitemap.xml`.

## Design tokens

Tailwind aliases: `bg` (#0A0A0B), `bg-surface` (#141416), `text` (#EDEDEF), `text-secondary` (#888890), `accent` (#6C63FF), `accent-secondary` (#00D4AA).
Fonts: Plus Jakarta Sans (body) + JetBrains Mono — loaded via `next/font/google` in `layout.tsx` with CSS variables, not `@import`.

## Non-obvious constraints

- All pages are fully static (`output: "export"`); `next start` is dead code.
- Images: `unoptimized: true` (no Next.js Image Optimization at build time).
- `prefers-reduced-motion` disables all animations (orbs, scanlines, reveals, glows, modals, glitch).
- `EmailLink` sets `mailto:` via `useEffect` after hydration — empty during SSR to prevent scraping.
- Turnstile: non-interactive widget loaded lazily (IntersectionObserver on section). Renders below submit button. Reset on successful send.
- Contact form: native `<dialog>` for success/error feedback. Form resets on dialog close after success.
- License: CC BY-NC-SA 4.0. See `COPYRIGHT.md`.
- `Tag` component (`components/tag.tsx`) centralizes all tag styling with `animate-tagHeroGlow` and `hashDelay`-based staggered delays. Import via `<Tag>` (size `"sm"` default, `"md"` for hero/skills).
