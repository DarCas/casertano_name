# casertano.name — www

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js_22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Static Export](https://img.shields.io/badge/static_export-0A0A0B?style=for-the-badge&logo=vercel&logoColor=white)](#)

[![CC BY-NC-ND 4.0](https://img.shields.io/badge/license-CC_BY--NC--ND_4.0-E9347A?style=for-the-badge&logo=creativecommons&logoColor=white)](../LICENSE.md)

Static portfolio of **Dario Casertano** ([casertano.name](https://casertano.name)). Personal site with a dark, terminal/code-style layout, generated as a static Next.js 15 build.

- **Next.js 15** with App Router and static export (`output: "export"`)
- **React 19**, strict **TypeScript**, **Tailwind CSS v3**
- **JetBrains Mono** / **Plus Jakarta Sans** fonts via `next/font`
- No backend: data (projects, contacts) comes from an external API via `NEXT_PUBLIC_API`

---

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (predev: `extract-version.mjs` + `fetch-projects.mjs`) |
| `npm run build` | Static build into `out/` (postbuild: sitemap + inline CSS) |
| `npm run lint` | `next lint` |
| `ANALYZE=true npm run build` | Build with bundle analysis (`@next/bundle-analyzer`) |

> **Note:** the build is slow — avoid unless requested.

## Architecture

```
app/          → App Router: layout, page, not-found, privacy-policy, progetti/[slug], globals.css
components/   → Landing sections (Hero, Nav, Projects, Skills, Contact, Footer, Network) + primitives
lib/          → Data & types: projects.ts, projects-data.ts (generated snapshot), skills.ts, utils.ts, version.ts (generated)
scripts/      → Build tooling: extract-version, generate-sitemap, inline-css
public/       → Favicon, llms.txt, robots.txt, opengraph.jpeg, sw.js
```

Data flow:

```
www ── GET /projects ──► API (NEXT_PUBLIC_API)
  │        ▲
  │   POST /contacts
  ▼        │
Projects and contacts are fetched client-side: static export does no server-side fetching.
```

## Configuration

- **next.config.ts** — `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`
- **tsconfig.json** — strict, alias `@/*` → root
- **tailwind.config.ts** — custom palette (bg, accent, accent-secondary…) and glow animations
- **.nvmrc** — Node 22.22.2

## Environment variables (`.env`)

`NEXT_PUBLIC_` prefix for anything exposed to the client:

| Variable | Usage |
| --- | --- |
| `NEXT_PUBLIC_API` | Base API URL (projects, contacts) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Enables the contact section + footer email |
| `NEXT_PUBLIC_NAME`, `NEXT_PUBLIC_VAT` | Footer data |
| `NEXT_PUBLIC_SOCIAL_GITHUB`, `…_LINKEDIN`, `…_TELEGRAM` | Footer icons (filtered when absent) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare captcha (optional: without it, the form uses a "skip" token) |

API-side vars (`SMTP_*`, `TURNSTILE_SECRET_KEY`) are not used here: they live in the backend.

## Conventions

- **No comments in code** except the license header.
- Formatting: 4 spaces, semicolons always.
- Section pattern: `SectionLabel` (e.g. `// progetti`) → title → subtitle; the label mirrors the nav item.
- UI content in Italian, technical labels in English.
- Client components require `"use client"`; static components stay server-side.

### Known constraints

- The hero tags (`heroSkills`) are **hand-curated** in `components/hero.tsx`, not derived from `lib/skills.ts`.
- The hero skill counter derives from `lib/skills.ts`.

## License

Distributed under [CC BY-NC-ND 4.0](../LICENSE.md) — © 2026 Casertano Dario. All rights reserved.
