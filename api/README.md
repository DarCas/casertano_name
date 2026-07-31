# Environment API

Express.js API server for the portfolio website of Dario Casertano.

![Node.js 22](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)
![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Express 4](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white&style=for-the-badge)
![Joi 18](https://img.shields.io/badge/Joi-18-fdd835?style=for-the-badge)
![Nodemailer 9](https://img.shields.io/badge/Nodemailer-9-339933?style=for-the-badge)
![GlitchTip](https://img.shields.io/badge/Monitoring-GlitchTip-362D59?logo=sentry&logoColor=white&style=for-the-badge)

[![CC BY-NC-ND 4.0](https://img.shields.io/badge/license-CC_BY--NC--ND_4.0-E9347A?style=for-the-badge&logo=creativecommons&logoColor=white)](../LICENSE.md)

## Overview

A single Node.js service that powers the entire site:

- **REST API v1** under `/api/v1` (portfolio projects + contact form).
- **Static hosting** of the built frontend (from `../www`), with a SPA-style 404 fallback.
- **Project media** served from local storage at `/images/projects`.

## Features

- JSON envelope contract `{code, text, pyld}` on every API response, plus an `x-api-version` header.
- Joi validation with **Italian** error messages (`@stdlib/joi`).
- Cloudflare **Turnstile** anti-spam on the contact form (auto-skipped when unconfigured).
- **Nodemailer** mail delivery (SMTP without auth in local dev).
- **express-rate-limit** on `POST /api/v1/contacts` (5 req / 15 min).
- Sentry integration via **GlitchTip**, production only.
- Yargs CLI exposing a single `api` command.

## Getting started

Requirements: **Node.js 22** (`.nvmrc`), npm.

```bash
npm install
cp .env.example .env          # then edit with your values
./@bin/ts-node-respawn api    # hot-reload dev server on :3001
```

Environment files cascade: `.env` ← `.env.rc` ← `.env.beta` ← `.env.local`, each overriding the previous one. See [Environment](#environment).

## Commands

All commands run from the `api/` directory. `package.json` defines no scripts — use the `@bin/` wrappers.

| Action | Command |
|---|---|
| Dev (hot-reload) | `./@bin/ts-node-respawn api` |
| Dev (no watch) | `./@bin/ts-node api` |
| Build (typecheck + emit) | `./@bin/build` — `tsc` + `tscpaths` (rewrites `@/*`) |
| Production | `node dist/index.js api` |

There are no tests and no linter. `./@bin/build` is the only verification step.

## API

All endpoints are mounted under `/api/v1` and answer with the envelope below.

### Response envelope

```json
{
  "code": 200,
  "text": "OK",
  "pyld": { }
}
```

- `code` / `text` — the HTTP status and its description.
- `pyld` — the payload (note the misspelling: it is the actual wire contract).
- Every response carries the `x-api-version` header (package version).

### `GET /api/v1/projects`

Returns the portfolio projects enriched with media, if any exist in storage.

- `200` → handled as **302 Found** by the controller — the list arrives in the body regardless.
- `204 No Content` → no projects configured.

Payload: array of `Projects.Project` objects (`slug`, `title`, `short`, `description`, `tags`, `skills`, `features`, `media`). Each `media` item is `{src, type}` where `src` is an absolute URL built from `NEXT_PUBLIC_API` with an `?mtime` cache-buster, e.g.:

```
/images/projects/<slug>.<ext>?<mtime>
```

### `POST /api/v1/contacts`

Sends the contact form by email (body is HTML + text, from the templates in `src/templates/form/contacts/`).

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, ≥ 3 chars |
| `email` | string | required, valid email |
| `message` | string | required, ≤ 255 chars, HTML tags stripped |
| `consent` | `"on"` | required — GDPR consent |
| `cf-turnstile-response` | string | required, token from Turnstile |

Responses:

| Status | Meaning |
|---|---|
| `200 OK` | email sent |
| `412 Precondition Failed` | validation failed — body is a `{field: message}` map |
| `498 Invalid Token` | Turnstile verification failed |
| `429 Too Many Requests` | rate limit exceeded |
| `500 Internal Server Error` | mailer error |

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `GLITCHTIP_AUTH_TOKEN` | no | GlitchTip tooling; **not read at runtime** |
| `GLITCHTIP_DSN` | no | Sentry/GlitchTip DSN |
| `NEXT_PUBLIC_API` | yes | base URL used to build project media URLs |
| `NEXT_PUBLIC_CONTACT_EMAIL` | yes | recipient of contact form emails |
| `RELEASESTAGE` | no | Sentry environment label |
| `SMTP_HOST` / `SMTP_PORT` | yes | mailer connection |
| `SMTP_USER` / `SMTP_PASS` | no | SMTP auth — **omitted in local dev** (no-auth SMTP) |
| `SMTP_SECURE` | no | `"true"` for TLS (default `false`) |
| `TURNSTILE_SECRET_KEY` | no | Cloudflare Turnstile — verification skipped when unset |

Notes:

- The effective environment name is derived from the **suffix of the last env file present**: `.env` → `production`, `.env.rc` → `rc`, `.env.beta` → `beta`, `.env.local` → `development`. It is **not** `NODE_ENV`.
- `bootstrap.env` / `testEnv()` drive CORS and Sentry behavior. In `development` the CORS origin becomes `*`.
- Env vars are typed in `env.d.ts` (`NodeJS.ProcessEnv`) but never validated at runtime — add new ones there.
- `NEXT_PUBLIC_*` variables also feed the frontend build; only the two above are consumed by the API.

## Architecture

```
src/index.ts             — CLI: yargs → registers `api` command (tz Europe/Rome, locale it-IT)
src/Http/index.ts        — Express app (port 3001, configurable via --port)
src/Http/Client/         — REST API v1 (routes, controllers, validations)
src/@stdlib/             — Internal lib: env loader, Joi wrapper (IT errors), route factory, Sentry
src/@projlib/Storage     — Storage path helpers
src/projects.ts          — Portfolio project data
src/templates/           — Email templates (plain HTML, read at runtime)
```

### Routing

The route factory (`@stdlib/expressjs/routes`) maps `path` + HTTP method to `camelCase(action) + 'Action'` on the controller. Actions are `StdAction` strings (`'list'` → `listAction`, `'create'` → `createAction`), a `:`-prefixed action resolves from a route param, or a function is called directly. Per-route middlewares are keyed `path` or `path|method` (e.g. the rate limit on `POST /contacts`). A catch-all `router.all('*')` returns 404.

### Static serving

- The built frontend is served from `../www` (immutable, `maxAge: 1y`); non-`/api/*` misses serve `www/404.html`.
- `/images/projects` serves `@storage/images/projects`. Media files are `<slug>.<ext>` (webp/png/jpg/jpeg, mp4).
- ETag is disabled globally (`app.disable('etag')`) — static middleware re-enables it via `etag: true`, keeping API JSON responses ETag-free.

## Build & deployment

`./@bin/build` runs `tsc` + `tscpaths` (rewrites `@/*` aliases to relative paths in `dist/`), then copies `.env`, `package.json`, `package-lock.json` and `src/templates` into `dist/`. Run with `node dist/index.js api`. `dist/` is gitignored (build artifact).

## License

Distributed under [CC BY-NC-ND 4.0](../LICENSE.md) — © 2026 Casertano Dario. All rights reserved.
