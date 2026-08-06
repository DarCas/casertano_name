# AGENTS.md — casertano.name/www

Portfolio statico di Dario Casertano (`https://casertano.name`). Build statica Next.js 15 con App Router, React 19 e Tailwind CSS v3. Layout scuro, stile terminal/code.

## Comandi

- `npm run dev` — dev server (predev: `extract-version.mjs` + `fetch-projects.mjs`)
- `npm run build` — build statica in `out/` (prebuild: `extract-version.mjs` + `fetch-projects.mjs`; postbuild: `generate-sitemap.mjs` + `inline-css.mjs` + `stamp-sw.mjs`)
- `npm run lint` — `next lint`
- `ANALYZE=true npm run build` — bundle analysis con `@next/bundle-analyzer`

**Regola: NON eseguire `npm run build` se non richiesto esplicitamente.** La build è lenta e inutile durante l'iterazione.

## Architettura

- `app/` — App Router: `layout.tsx` (metadata, font, JSON-LD), `page.tsx` (composizione sezioni), `progetti/[slug]/` (pagine statiche progetto, da snapshot), `not-found.tsx`, `privacy-policy/`, `globals.css`
- `components/` — sezioni della landing (Hero, Nav, Projects, Skills, Contact, Footer, Network) + primitivi (SectionLabel, Tag, EmailLink, BackToTop, HomeArrow, RedirectTimer, ServiceWorkerUpdater) + ProjectDetail (dettaglio statico, riusato dalle pagine progetto; senza card: media `aspect-[2/1]`, features/skills con SectionLabel + Tag, stile sezioni homepage)
- `lib/` — dati e tipi: `projects.ts` (fetch progetti da API), `projects-data.ts` (generato: snapshot progetti), `skills.ts` (tassonomia categorie), `utils.ts`, `version.ts` (generato)
- `scripts/` — build tooling: `extract-version.mjs` (scrive `lib/version.ts` da package.json), `fetch-projects.mjs` (scrive `lib/projects-data.ts` da API), `generate-sitemap.mjs` (legge `out/progetti/` per aggiungere le pagine progetto), `inline-css.mjs`, `stamp-sw.mjs` (scrive in `out/sw.js` il marker `__BUILD_ID__` con `v{version}-{timestamp}`)
- `public/` — favicon, `apple-touch-icon.svg`, `llms.txt`, `llms-full.txt`, `robots.txt`, `opengraph.jpeg`, `sw.js` (SW minimale di aggiornamento: nessun caching/fetch handler, solo `skipWaiting` + `clients.claim`; i byte cambiano a ogni build grazie allo stamping)

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
- `lib/projects-data.ts` è generato da `scripts/fetch-projects.mjs` in predev/prebuild ed è committato: in `components/projects.tsx` è lo stato iniziale (prerender per SEO), poi il refresh client al mount può sovrascriverlo. Se il fetch fallisce, lo snapshot resta invariato (build mai rotta). Lo script legge `.env` prima di `.env.local`: lo snapshot rispecchia sempre l'API pubblica, mai quella locale.
- Le pagine `/progetti/[slug]/` sono server component generate da `generateStaticParams()` su `projects-data.ts`: la card in `project-card.tsx` è un `<a>` reale verso la pagina (niente modal — eliminato). Ogni pagina progetto include Nav e Footer e ha una freccia `&larr;` accanto al titolo che torna alla homepage (niente breadcrumb visibile; il JSON-LD `BreadcrumbList` resta per SEO). La sitemap e `llms.txt`/`llms-full.txt` includono le pagine progetto.
- La freccia home (pagine progetto e privacy) è il componente client `components/home-arrow.tsx` (`HomeArrow`): legge `window.location.hash` a mount; se `#from-contact` (arrivo dal form contatti) punta a `/#contatti`, altrimenti a `/`. Il link "informativa privacy" del form in `components/contact.tsx` usa `href="/privacy-policy/#from-contact"`; il link del footer resta pulito (niente hash).
- La `Nav` (`components/nav.tsx`) usa `usePathname()`: su home gestisce scroll-spy + smooth-scroll su Home; su pagine non-home i link sezione puntano a `/#...`, Home è un Link reale e il link "Progetti" resta evidenziato (attivo) sulle pagine `/progetti/`.
- L'auto-aggiornamento dopo il deploy dipende da due pezzi: (1) lato API, Express serve `/_next/static` con `immutable, max-age=1y` e tutto il resto (HTML, `sw.js`, `llms.txt`) con `Cache-Control: public, no-cache` + ETag; (2) il SW `public/sw.js` (stampato a ogni build) registrato da `components/service-worker.tsx` (`ServiceWorkerUpdater`, solo in produzione): su `controllerchange` fa `location.reload()` solo se era già attivo un SW (niente reload al primo install) e chiama `registration.update()` ogni 60s per le tab aperte. Nessun caching lato SW: niente offline, niente installazione PWA.
- **NON eseguire mai commit senza esplicito permesso.**
