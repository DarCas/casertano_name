# AGENTS.md — casertano.name/www

Portfolio statico di Dario Casertano (`https://casertano.name`). Build statica Next.js 15 con App Router, React 19 e Tailwind CSS v3. Layout scuro, stile terminal/code.

## Comandi

- `npm run dev` — dev server (predev: `extract-version.mjs` + `fetch-projects.mjs`)
- `npm run build` — svuota `out/` e la Data Cache Next (`.next/cache/fetch-cache`) poi build statica in `out/` (prebuild: `extract-version.mjs` + `fetch-projects.mjs` + `generate-llms.mjs`; postbuild: `generate-sitemap.mjs` + `inline-css.mjs` + `stamp-sw.mjs`)
- `npm run lint` — `next lint`
- `ANALYZE=true npm run build` — bundle analysis con `@next/bundle-analyzer`

**Regola: NON eseguire `npm run build` se non richiesto esplicitamente.** La build è lenta e inutile durante l'iterazione.

## Architettura

- `app/` — App Router: `layout.tsx` (metadata, font, JSON-LD), `page.tsx` (composizione sezioni), `progetti/[slug]/` (pagine statiche progetto, generate da Strapi a build), `not-found.tsx`, `privacy-policy/`, `globals.css`
- `components/` — sezioni della landing (Hero, Nav, Projects, Skills, Contact, Footer, Network) + primitivi (SectionLabel, Tag, EmailLink, BackToTop, HomeArrow, RedirectTimer, ServiceWorkerUpdater) + ProjectDetail (dettaglio statico, riusato dalle pagine progetto; senza card: media `aspect-[2/1]`, features/skills con SectionLabel + Tag, stile sezioni homepage)
- `lib/` — dati e tipi: `projects.ts` (fetch progetti da API), `projects-data.ts` (generato: snapshot progetti), `skills.ts` (tassonomia categorie), `utils.ts`, `version.ts` (generato)
- `scripts/` — build tooling: `extract-version.mjs` (scrive `lib/version.ts` da package.json), `fetch-projects.mjs` (scrive `lib/projects-data.ts` da Strapi), `generate-llms.mjs` (rigenera `public/llms.txt` e `public/llms-full.txt` dai progetti Strapi live), `generate-sitemap.mjs` (legge `out/progetti/` per aggiungere le pagine progetto), `inline-css.mjs`, `stamp-sw.mjs` (scrive in `out/sw.js` il marker `__BUILD_ID__` con `v{version}-{timestamp}`), `lib/strapi.mjs` (modulo condiviso: `readEnv` e `fetchProjects` da Strapi, usato da `fetch-projects.mjs` e `generate-llms.mjs`; lancia su env mancante/HTTP error/rete/CMS vuoto — niente fallback)
- `public/` — icone (`favicon.ico`, `maskable_icon_x*.png`), `llms.txt`, `llms-full.txt`, `robots.txt`, `opengraph.jpeg`, `sw.js` (SW minimale di aggiornamento: nessun caching/fetch handler, solo `skipWaiting` + `clients.claim`; i byte cambiano a ogni build grazie allo stamping)

## Configurazione

- `next.config.ts` — `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`
- `tsconfig.json` — strict, alias `@/*` → root, exclude `api`
- `tailwind.config.ts` — palette custom (bg, bg-surface, text, text-secondary, accent, accent-light, accent-secondary), font JetBrains Mono / Plus Jakarta Sans via variabili CSS
- `.nvmrc` — Node 22.22.2
- Licenza CC BY-NC-ND 4.0 — header di copyright in cima ai file sorgente

## Ambiente (variabili `.env`, prefisso `NEXT_PUBLIC_`)

- `NEXT_PUBLIC_CMS_API` — base URL Strapi (include `/api`), usata da `scripts/lib/strapi.mjs` (`fetchProjects`) e da `lib/projects.ts` (`fetchProjects`: `getProjects()` server-side + refresh client). `.env` = CMS pubblico, `.env.local` = localhost. I media Strapi hanno URL relativi (`/uploads/...`): la mappatura li rende assoluti col origin del CMS. Nella build Docker `.env.local` è escluso dal contesto (`**/.env.local` in `.dockerignore`), quindi resta solo `.env` (CMS pubblico)
- `NEXT_PUBLIC_CMS_API_TOKEN` — token API Strapi (header `Authorization: Bearer`) per le fetch a `/projects`
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
- `lib/projects-data.ts` è generato da `scripts/fetch-projects.mjs` in predev/prebuild ed è committato: in `components/projects.tsx` è lo stato iniziale (prerender per SEO), poi il refresh client al mount può sovrascriverlo. Lo script usa `fetchProjects()` da `scripts/lib/strapi.mjs` che lancia su env mancante/HTTP error/rete/CMS vuoto: Strapi irraggiungibile = predev/prebuild fallisce, snapshot invariato. Lo script legge `.env` prima di `.env.local`: lo snapshot rispecchia sempre l'API pubblica, mai quella locale.
- `lib/projects-server.ts` espone `getProjects()` (server-only): fa **sempre** fetch da Strapi via `fetchProjects()` (`NEXT_PUBLIC_CMS_API` + token Bearer), sia in dev sia a build — nessun fallback snapshot. `fetchProjects()` lancia su env mancante/HTTP error/rete: CMS irraggiungibile = build fallisce; CMS raggiungibile ma vuoto = `[]` (nessuna pagina progetto). È usato da `generateStaticParams()`, `generateMetadata()`, dal componente in `app/progetti/[slug]/page.tsx` e dall'`ItemList` JSON-LD in `app/layout.tsx`. Nota: cambiare i dati in Strapi mentre `next dev` è attivo può richiedere un restart del dev server per ricalcolare `generateStaticParams`.
- **Data Cache Next sui progetti (gotcha build statiche).** `next build` conserva una cache persistente delle fetch in `.next/cache/fetch-cache`. Se contiene una risposta stantia di `/projects`, la fase di render (pagina `[slug]` + `ItemList` in `layout.tsx`) riusa i progetti vecchi → le pagine nuove finiscono in `notFound()` (URL HTTP 200 ma corpo 404) mentre `generateStaticParams` e gli script (`fetch` Node puro in `scripts/lib/strapi.mjs`) vedono i progetti nuovi: split "16 directory in `out/progetti/` ma solo 14 renderizzate". Per questo `build` esegue `rm -rf out/ .next/cache/fetch-cache` prima di `next build`, il `Dockerfile` fa `rm -rf .next/cache/fetch-cache` dopo `COPY www/. .`, e `.dockerignore` usa pattern ricorsivi (`**/.next`, `**/out`, `**/node_modules`, `**/.env.local`): i pattern senza `**/` NON matchano le sottocartelle `www/*`, quindi cache e artefatti stale finivano nel contesto Docker. Non aggiungere `cache: "no-store"` alla fetch dei progetti: con `output: "export"` Next lo traduce in `revalidate: 0` e il prerender statico fallisce (`Route /privacy-policy with dynamic = "error" couldn't be rendered statically`).
- Le pagine `/progetti/[slug]/` sono server component generate da `generateStaticParams()` (v. `getProjects()` sopra, sempre da Strapi): la card in `project-card.tsx` è un `<a>` reale verso la pagina (niente modal — eliminato). La card usa il formato Strapi `formats.small` (risolto assoluto in `fetchProjects` di `lib/projects.ts` e `scripts/lib/strapi.mjs`, fallback al media originale); il dettaglio in `project-detail.tsx` usa il media originale. Ogni pagina progetto include Nav e Footer e ha una freccia `&larr;` accanto al titolo che torna alla homepage (niente breadcrumb visibile; il JSON-LD `BreadcrumbList` resta per SEO). La sitemap e `llms.txt`/`llms-full.txt` includono le pagine progetto.
- La freccia home (pagine progetto e privacy) è il componente client `components/home-arrow.tsx` (`HomeArrow`): legge `window.location.hash` a mount; se `#from-contact` (arrivo dal form contatti) punta a `/#contatti`, altrimenti a `/`. Il link "informativa privacy" del form in `components/contact.tsx` usa `href="/privacy-policy/#from-contact"`; il link del footer resta pulito (niente hash).
- La `Nav` (`components/nav.tsx`) usa `usePathname()`: su home gestisce scroll-spy + smooth-scroll su Home; su pagine non-home i link sezione puntano a `/#...`, Home è un Link reale e il link "Progetti" resta evidenziato (attivo) sulle pagine `/progetti/`. Su pagine non-home il click sui link di sezione viene intercettato (`handleSectionClick`): `preventDefault()` + `window.location.assign("/#id")`, cioè navigazione nativa con hash. Motivo: in produzione il router Next 15 (`output: "export"`) degrada `router.push("/")` (e anche un `<Link href="/">`) a un hard page reload che perde hash e scroll (verificato: `pagehide`/`beforeunload` durante la navigazione); la navigazione nativa con hash invece conserva il fragment e il browser scrolla da solo all'ancora rispettando `scroll-mt-[72px]` (e `scroll-behavior: smooth` in `globals.css`). Costo: full reload sui click di sezione da pagine non-home (già presente in prod), niente SPA transition. L'`href` `/#...` resta per no-JS e middle-click.
- L'auto-aggiornamento dopo il deploy dipende da due pezzi: (1) lato API, Express serve `/_next/static` con `immutable, max-age=1y` e tutto il resto (HTML, `sw.js`, `llms.txt`) con `Cache-Control: public, no-cache` + ETag; (2) il SW `public/sw.js` (stampato a ogni build) registrato da `components/service-worker.tsx` (`ServiceWorkerUpdater`, solo in produzione): ascolta sia `updatefound` sia `controllerchange` e fa `location.reload()` solo se era già attivo un SW (niente reload al primo install); `updatefound` scatta appena `update()` trova un nuovo script, senza attendere claim/skipWaiting; chiama `registration.update()` ogni 60s per le tab aperte. Nessun caching lato SW: niente offline, niente installazione PWA.
- **NON eseguire mai commit senza esplicito permesso.**
