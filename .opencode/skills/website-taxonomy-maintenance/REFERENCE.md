# Website Taxonomy Maintenance — Reference

## 0. Sorgente verità

Ordine: Strapi (`/projects` con `tags`) → `../../../www/components/hero.tsx` → `www/lib/skills.ts` → derivati (`lib/projects-data.ts`, `public/llms.txt`, `public/llms-full.txt` via template in `www/scripts/generate-llms.mjs`).

Script condiviso: `../../../www/scripts/lib/strapi.mjs` (`fetchProjects`). Lancia su env mancante / HTTP error / rete / CMS vuoto: niente fallback.

## 1. Normalizzazione skill Strapi

Principio: nessuna versione nel nome salvo cambio architetturale. La versione va dettagliata nel progetto, non nella tassonomia. Eccezioni dove la versione identifica un cambio di architettura o un nome storico distinto (es. `Zend Framework 3` resta versionato).

Mappa canonica (sinistra varianti → destra canonico):

- `Node 22`, `Node.js 22`, `Node` → `Node.js`
- `Vuetify 2`, `Vuetify 3`, `Vuetify 4`, `Vuetify.js` → `Vuetify`
- `PHP 7.2`, `PHP 8`, `php` → `PHP`
- `Express`, `ExpressJS` → `Express.js`
- `Telegram API`, `Telegram Bot API` → `Telegram Bot`
- `grammy`, `Grammy`, `grammYjs` → `grammY` (nota la Y maiuscola finale)
- `Dexie`, `dexie.js` → `Dexie.js`

Nuove skill: applica lo stesso principio (spoglia la versione, unifica casing al brand ufficiale). Se due nomi storicamente distinti (es. `Vuex` vs `Pinia`, `Zend Framework 3` vs `Laminas`), non fonderli. `Strapi 5` nei progetti resta versionato solo se arch-change confermato, in tassonomia usa `Strapi` plain.

## 2. Hero curata — `../../../www/components/hero.tsx`

`heroSkills` è curato a mano, NON derivato da `skills.ts`. 15 tag in 4 blocchi ordinati:

- AI (4): `Agentic AI`, `LangChain`, `DeepAgents`, `RAG`
- Core (4): `TypeScript`, `Node.js`, `Vue`, `Docker`
- Backend (2): `Fastify`, `Laravel`
- Specialty (5): `Solidity`, `TypeORM`, `MariaDB`, `WebRTC`, `MQTT`

Regole: mantieni l'ordine dei blocchi e i conteggi salvo decisione esplicita. Sostituisci un tag solo se la skill esce dalla tassonomia o una nuova è più rappresentativa. Il contatore `skills` accanto all'hero deriva da `categories.reduce` in `skills.ts` e si aggiorna da solo.

## 3. Tassonomia — `../../../www/lib/skills.ts`

10 categorie, label in inglese, ordine fisso. Stato curato corrente:

1. `Languages & Runtimes`: TypeScript, JavaScript, Node.js, PHP
2. `Frontend & Libraries`: Vue, Vuetify, Pinia, Vuex, React, Next.js, Tailwind CSS, Vite, Chart.js, Syncfusion Gantt, Dexie.js, IndexedDB, Workbox, Service Worker, Vee-Validate, PWA
3. `Backend & APIs`: REST API, JWT, OAuth2, Express.js, Fastify, TypeBox, Laravel, Eloquent, Zend Framework 3, Doctrine ORM, TypeORM, Drizzle ORM, Strapi, Dolibarr, Joi, Zod, yargs, Nodemailer, Docxtemplater, PhpWord, mPDF, Moodle, Composer
4. `Databases`: MariaDB, PostgreSQL, MySQL, SQLite, Redis, Microsoft SQL Server, Firebase
5. `DevOps & Infrastructure`: Docker, Docker Compose, Linux, Apache, Mosquitto, coturn, Sentry, PM2, rsync, GitHub Actions, GitHub Pages
6. `Tooling & Build`: npm, Rollup, Terser, Lodash, Semantic Versioning, ES6 Modules, Vitest, PHPUnit, Sass, Webpack Encore, PostCSS
7. `Real-time & Messaging`: MQTT, WebRTC, WebSocket, grammY, Telegram Bot, Gmail API, IMAP
8. `AI & Agents`: OpenAI, OpenAI Vision, LangChain, DeepAgents, Agentic AI, RAG, Tool Calling, ReAct Pattern
9. `Blockchain`: Solidity, Ethers.js, Polygon, ERC-721, MetaMask, IPFS, Filebase
10. `Geospatial`: GDAL, GeoJSON, KML, TopoJSON, Geospatial ETL, Valhalla, Leaflet, OpenStreetMap

Ogni rename in Strapi va riportato qui con casing identico. Non creare nuove categorie senza motivo: ricolloca prima nelle 10.

## 4. Artefatti derivati

### 4a. Template hardcoded in `../../../www/scripts/generate-llms.mjs`

`FULL_HEADER` contiene liste hardcoded che NON si aggiornano da sole: `Core stack` (riga singola) + sezioni `## Skills` per categoria. Dopo ogni cambio a `skills.ts`, riporta gli stessi nomi/casing nel template.

Divergenze note da riallineare al prossimo giro: `skills.ts` ha `Strapi` / `GitHub Pages`, il template ha `Strapi 5` / senza `GitHub Pages`. Anche la riga `Core stack` deve riflettere l'hero corrente (`DeepAgents`, `TypeORM`, `MariaDB`, senza `OpenAI`/`Ethers.js`).

### 4b. Rigenerazione

Da `../../../www`:

```bash
node scripts/fetch-projects.mjs
node scripts/generate-llms.mjs
```

Output: `lib/projects-data.ts` (snapshot committato, stato iniziale SEO poi sovrascrivibile dal refresh client), `public/llms.txt` + `public/llms-full.txt` (dai progetti Strapi live + template).

### 4c. Gotcha cache e dev

- `fetch-projects.mjs` / `generate-llms.mjs` usano `fetch` Node puro: vedono sempre Strapi live.
- Il render (`generateStaticParams`, `ItemList` in `layout.tsx`, `lib/projects-server.ts`) usa la Data Cache Next in `.next/cache/fetch-cache`: se stantia, pagine nuove finiscono in `notFound` (split directory renderizzate vs generate). Fix: `rm -rf out/ .next/cache/fetch-cache` prima di `next build` (già nel comando `build` e nel Dockerfile). Mai aggiungere `cache: "no-store"` (rompe `output: "export"`).
- Lo script legge `.env` prima di `.env.local`: lo snapshot rispecchia sempre l'API pubblica. Cambio dati Strapi a `next dev` attivo → restart dev server per ricalcolare `generateStaticParams`.
- Env coinvolte (solo nomi, mai valori): `NEXT_PUBLIC_CMS_API`, `NEXT_PUBLIC_CMS_API_TOKEN`.
