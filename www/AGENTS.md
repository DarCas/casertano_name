# AGENTS.md — casertano.name/www

Portfolio statico di Dario Casertano (`https://casertano.name`). Build statica Next.js 15 con App Router, React 19 e Tailwind CSS v3. Layout scuro, stile terminal/code.

## Comandi

- `npm run dev` — dev server (predev: `node scripts/extract-version.mjs`)
- `npm run build` — build statica in `out/` (postbuild: `generate-sitemap.mjs` + `inline-css.mjs`)
- `npm run lint` — `next lint`
- `ANALYZE=true npm run build` — bundle analysis con `@next/bundle-analyzer`

**Regola: NON eseguire `npm run build` se non richiesto esplicitamente.** La build è lenta e inutile durante l'iterazione.

## Architettura

- `app/` — App Router: `layout.tsx` (metadata, font, JSON-LD), `page.tsx` (composizione sezioni), `not-found.tsx`, `privacy-policy/`, `globals.css`
- `components/` — sezioni della landing (Hero, Nav, Projects, Skills, Contact, Footer) + primitivi (SectionLabel, Tag, EmailLink)
- `lib/` — dati e tipi: `projects.ts` (fetch progetti da API), `skills.ts` (tassonomia categorie), `utils.ts`, `version.ts` (generato)
- `scripts/` — build tooling: `extract-version.mjs` (scrive `lib/version.ts` da package.json), `generate-sitemap.mjs`, `inline-css.mjs`
- `public/` — favicon, `llms.txt`, `robots.txt`, `opengraph.jpeg`, `sw.js`

## Configurazione

- `next.config.ts` — `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`
- `tsconfig.json` — strict, alias `@/*` → root, exclude `api`
- `tailwind.config.ts` — palette custom (bg, bg-surface, text, text-secondary, accent, accent-light, accent-secondary), font JetBrains Mono / Plus Jakarta Sans via variabili CSS
- `.nvmrc` — Node 22.22.2
- Licenza CC BY-NC-ND 4.0 — header di copyright in cima ai file sorgente

## Ambiente (variabili `.env`, prefisso `NEXT_PUBLIC_`)

- `NEXT_PUBLIC_API` — base URL API (progetti, contatti)
- `NEXT_PUBLIC_CONTACT_EMAIL` — attiva sezione contatti + email footer
- `NEXT_PUBLIC_NAME`, `NEXT_PUBLIC_VAT` — dati footer
- `NEXT_PUBLIC_SOCIAL_GITHUB`, `NEXT_PUBLIC_SOCIAL_LINKEDIN`, `NEXT_PUBLIC_SOCIAL_TELEGRAM` — icone footer (filtrate se assenti)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — captcha (opzionale: senza, il form usa token "skip")
- `SMTP_*`, `TURNSTILE_SECRET_KEY` — lato API, non usate qui

## Convezioni

- **Niente commenti nel codice** salvo header licenza.
- Formatazione: 4 spazi, punto e virgola sempre, ternari compatti.
- Le sezioni seguono lo schema `SectionLabel` → titolo → sottotitolo; il SectionLabel è il commento stile terminal (`// progetti`, `// parliamone`, ecc.) e rispecchia la label del nav.
- Contenuto UI in italiano; etichette/labels tecniche in inglese.
- Client component (hook, state, eventi) richiedono `"use client"`; componenti statici restano server.
- Chiamate API client-side per progetti e contatti (static export: niente fetching server).

## Vincoli noti

- I tag hero (`heroSkills`) sono curati a mano in `components/hero.tsx`, NON derivati da `lib/skills.ts`. Modificare `skills.ts` non aggiorna l'hero: vanno editati indipendentemente.
- Il contatore skill nell'hero deriva da `lib/skills.ts` (`categories.reduce`).
- **NON eseguire mai commit senza esplicito permesso.**
