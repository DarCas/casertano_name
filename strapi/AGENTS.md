# AGENTS.md — casertano.name/strapi

Headless CMS Strapi 5 per il portfolio di Dario Casertano (`https://casertano.name`). Fornisce la REST API `/api/projects` al frontend `www/`. SQLite, Docker, MCP abilitato.

## Comandi

| Action | Command |
|---|---|
| Dev (hot-reload) | `npm run dev` |
| Build (admin panel) | `npm run build` |
| Start (production) | `npm start` |
| Strapi CLI | `npm run strapi -- <command>` |
| Upgrade | `npm run upgrade` |

**Regola: NON eseguire `npm run build` se non richiesto esplicitamente.** Durante lo sviluppo `npm run dev` gestisce la build automaticamente.

## Architettura

- `src/api/project/` — content type `Project` (core factories, nessuna customizzazione): controller, router, service usano `factories.createCore*()`. Schema: title, slug, short, description (richtext), features/skills/tags (componenti ripetibili), sort_order, lib (boolean), github, website, media (images+videos)
- `src/components/project/` — 3 componenti riutilizzabili: `feature.json`, `skill.json`, `tag.json` (tutti con campo `name` obbligatorio)
- `src/index.ts` — bootstrap e register hooks (vuoti)
- `config/` — server (host, port, MCP enabled), database (SQLite via better-sqlite3), plugins (upload locale 10MB, users-permissions JWT), middlewares (strapi stack standard), admin (JWT, API token, transfer token), api (REST defaults: limit 25/100, withCount, strictParams)
- `types/generated/` — TypeScript auto-generati da Strapi (`contentTypes.d.ts`, `components.d.ts`)
- `public/uploads/` — media caricati dall'admin
- `public/robots.txt` — blocca tutto tranne `/uploads/` ( consentito ai crawler)
- `data/` — file SQLite (`database.sqlite`)
- `database/migrations/` — migrazioni auto-generate
- `.secrets/strapi-mcp-token` — token per l'accesso MCP (gitignored)

## Configurazione

- `config/server.ts` — `host: 0.0.0.0`, `port: 1337`, `mcp.enabled: true`
- `config/database.ts` — SQLite, `acquireConnectionTimeout: 60000`, file in `DATABASE_FILENAME`
- `config/plugins.ts` — upload: provider `local`, `sizeLimit: 10485760` (10MB), allowed `image/*` + `video/*`, denied SVG/exec/shell; users-permissions: JWT refresh, httpOnly sessions
- `config/api.ts` — `rest.defaultLimit: 25`, `rest.maxLimit: 100`, `strictParams: true`, `withCount: true`
- `config/middlewares.ts` — strapi stack standard (logger, errors, security, cors `*`, poweredBy, query, body, session, favicon, public)
- `tsconfig.json` — CommonJS, ES2019, strict, `outDir: dist`
- `.nvmrc` — Node 22
- Licenza CC BY-NC-ND 4.0 — header di copyright in cima ai file sorgente

## Ambiente (variabili `.env`)

Template in `.env.dist`, copiare in `.env` e sostituire i placeholder.

- `ADMIN_JWT_SECRET` — secret per il JWT admin (obbligatorio)
- `APP_KEYS` — chiavi separate da virgola per gli interni Strapi (obbligatorio)
- `API_TOKEN_SALT` — salt per la crittografia degli API token (obbligatorio)
- `JWT_SECRET` — secret per users-permissions JWT (obbligatorio)
- `ENCRYPTION_KEY` — chiave di crittografia per i secrets (obbligatorio)
- `TRANSFER_TOKEN_SALT` — salt per i transfer token (obbligatorio)
- `DATABASE_FILENAME` — percorso file SQLite (default `.tmp/data.db`)
- `HOST` — indirizzo bind (default `0.0.0.0`)
- `PORT` — porta ascolto (default `1337`)

Non c'è cascade `.env` come in `api/` — solo `.env` (e `.env.local` per override). Secrets runtime in `.secrets/` (gitignored).

## Convenzioni

- **Niente commenti nel codice** salvo header licenza.
- Header: `/* Dario Casertano <dario@casertano.name> ... CC-BY-NC-ND-4.0 ... */` in ogni file sorgente TypeScript.
- Formatazione: 4 spazi, virgola finale when multiline (editorconfig).
- Config functions usano arrow function con destrutturazione `({env})` dal params di Strapi.

## Vincoli noti

- Il content type `Project` usa **core factories** senza customizzazione — controller, router e service sono tutti `factories.createCore*()`. Qualsiasi logica custom va aggiunta qui (es. middleware, trasformazioni response).
- **MCP abilitato** in `config/server.ts` (`mcp.enabled: true`). Il token è in `.secrets/strapi-mcp-token`.
- L'upload è **locale** (no cloud provider) con filtro MIME: solo `image/*` e `video/*`. SVG e file eseguibili sono esplicitamente negati. `sizeLimit: 10485760` (10MB).
- `public/robots.txt` blocca l'indicizzazione di tutto tranne `/uploads/` — il CMS non deve essere indicizzato dai motori di ricerca.
- Il database SQLite è in `data/database.sqlite` (gitignored). Le migrazioni sono auto-generate in `database/migrations/`.
- `types/generated/` contiene i tipi TypeScript auto-generati da Strapi — non modificarli a mano, vengono rigenerati ad ogni build/dev.
- **NON eseguire mai commit senza esplicito permesso.**
