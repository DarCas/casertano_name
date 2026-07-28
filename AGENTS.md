# AGENTS.md — casertano.name

Static portfolio for Dario Casertano. Next.js 15 App Router, Tailwind CSS v3, TypeScript. `output: "export"` → `/out/`.

## Rules
- **NEVER commit** without explicit user permission. Only stage and prepare commits when asked.

## Commands

```bash
cp .env.example .env         # first-time setup
npm install                  # install deps
npm run dev                  # frontend dev :3000
npm run dev --prefix api     # API dev :3001 (hot-reload via tsx)
npm run build                # static export → /out/ (RUN ONLY ON REQUEST)
npm run lint                 # Next.js built-in lint (broken — no ESLint config)
```

`npm run start` is dead — `next start` needs a Node server, incompatible with static export. No tests.
`NEXT_PUBLIC_CONTACT_EMAIL` doubles as API recipient env — when absent, contact form and email link are hidden.
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is optional — when absent, Turnstile captcha is disabled (dev mode).
`NEXT_PUBLIC_API` sets the frontend API base URL (default: same-origin `/api`).
API reads from the same `.env` via `--env-file` (dev) or from Docker Compose. Next.js also auto-loads `.env.local` for overrides.

## Commit workflow

`.opencode/commands/commit.md` defines the commit message format (Conventional Commits + emojis, structured body sections). Use it when asked to commit.

## Deploy

- **Docker image**: `ghcr.io/darcas/casertano_name:<TAG>`. Build: `docker build -t ghcr.io/darcas/casertano_name:<TAG> .`.
- **Docker Compose**: `docker compose up -d` — Express serves `/out/` + `/api/` on port 3001. Container `name_casertano`, 128M memory limit.
- **API standalone** (deploy): `npm install --prefix api && npm run build --prefix api && npm start --prefix api`. Requires SMTP env vars in root `.env`.

## Architecture

- **`app/`** — 3 routes: `page.tsx` (homepage), `privacy/page.tsx`, `not-found.tsx` (glitch 404). All static.
- **`components/`** — UI components. `<Tag>` centralizes tag styling with `animate-tagHeroGlow` and staggered delays (`hashDelay`). Sizes: `"sm"` default, `"md"` for hero/skills.
- **`lib/`** — `projects.ts` (types + `fetchProjects()`), `skills.ts` (9 `SkillCategory` groups → skills section), `utils.ts` (`hashDelay` only).
- **`api/`** — Express ESM app, separate `package.json` + `tsconfig.json`. Serves `/out/` (static) + `/api/` routes. `GET /api/projects` from `api/src/projects.ts` with `media` populated dynamically from `api/@storage/images/projects/` (filesystem scan, cache-bust via mtime). `POST /api/contact` (Zod, rate-limited 5/15min, Nodemailer, Turnstile). Builds with `tsc` to `dist/`, runs via `node dist/index.js`. Excluded from root `tsconfig.json`. CORS via `CORS_ORIGIN` env.
- **`api/src/templates/contact-email.ts`** — HTML email template, `\n` → `<br>`.
- **`scripts/generate-sitemap.mjs`** — postbuild script, generates `out/sitemap.xml` (data build).
- **`api/@storage/images/projects/`** — gitignored directory for project media (images/video). Bind-mounted in Docker. Served by API at `/images/projects` with cache-busting mtime.
- **`app/globals.css`** — all styles. CSS custom properties for design tokens + custom scrollbar (thin, dark, accent thumb).
- **`public/`** — `favicon.svg`, `apple-touch-icon.svg`, `robots.txt`. Generated sitemap goes to `out/`.

## Design tokens

Tailwind aliases: `bg` (#0A0A0B), `bg-surface` (#141416), `text` (#EDEDEF), `text-secondary` (#888890), `accent` (#6C63FF), `accent-secondary` (#00D4AA).
Fonts: Plus Jakarta Sans (body) + JetBrains Mono — loaded via `next/font/google` CSS variables in `layout.tsx`.

## Non-obvious constraints

- All pages are fully static (`output: "export"`); `next start` is dead code. Dev API and static site are separate processes.
- Hero tags (`heroSkills` in `hero.tsx`) are manually curated for hype/appeal — changing `lib/skills.ts` does **not** update the hero. Update both independently.
- Images: `unoptimized: true` (no Next.js Image Optimization).
- `prefers-reduced-motion` disables all animations (orbs, scanlines, reveals, glows, modals, glitch).
- `EmailLink` sets `mailto:` via `useEffect` after hydration — empty during SSR (anti-scrape).
- Turnstile: non-interactive, loaded lazily (IntersectionObserver on section). Renders below submit button. Reset on successful send.
- Contact form: native `<dialog>` for feedback. Form resets on dialog close after success. Hidden entirely when `NEXT_PUBLIC_CONTACT_EMAIL` is unset.
- API: Express `app.listen(3001)` — port 3001 in Docker Compose and standalone. SPA fallback serves `index.html` for non-API paths.
- `@docs/` directory contains project reference docs and profile PDF (gitignored).
- License: CC BY-NC-SA 4.0 (`COPYRIGHT.md`). Node v22 (`.nvmrc`).
- Dockerfile multi-stage: builds frontend `/out/` + Express API in one image. Build copies `.env.build` → `.env` for `NEXT_PUBLIC_*` vars (non-secret), runtime secrets via Docker Compose `env_file`.
