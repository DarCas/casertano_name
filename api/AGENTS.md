# name.casertano.api

Express.js API server for casertano.name portfolio/contact.

## Stack

Node.js 22 (`.nvmrc`), TypeScript 5, Express 4, ts-node-dev, Yargs CLI, compression, cors, express-rate-limit, Joi, Nodemailer, Sentry (GlitchTip), Luxon, dotenv.

## Commands

| Action | Command |
|---|---|
| Dev (hot-reload) | `./@bin/ts-node-respawn api` |
| Dev (no watch) | `./@bin/ts-node api` |
| Build (typecheck + emit) | `./@bin/build` — `tsc` + `tscpaths` (rewrites `@/*`) |
| Production | `node dist/index.js api` |

No tests, no linter. `./@bin/build` (tsc) is the only verification step.

## Architecture

```
src/index.ts             — CLI: yargs → registers `api` command (tz Europe/Rome, locale it-IT)
src/Http/index.ts        — Express app (port 3001, configurable via --port)
src/Http/Client/         — REST API v1 (routes, controllers, validations)
src/@stdlib/             — Internal lib: env loader, Joi wrapper (IT errors), route factory, Sentry
src/@projlib/Storage     — Storage path helpers
src/projects.ts          — Portfolio project data
src/templates/           — Email templates (plain HTML, read at runtime; copied into dist by build)
```

## Routing

Route factory (`@stdlib/expressjs/routes`) maps `path` + HTTP method to `camelCase(action) + 'Action'` on the controller. Actions are `StdAction` strings (`'list'` → `listAction`, `'create'` → `createAction`), a `:`-prefixed action resolves from a route param, or a function is called directly. Middlewares are keyed by `path` or `path|method` (e.g. rate limit on `POST /contacts`). A catch-all `router.all('*')` returns 404.

Controllers reply via `res.toJson(body)` → `{code, text, pyld}` (`pyld` is misspelled by design — it's the wire contract). `x-api-version` header is added to every response (`HeadersMiddleware`).

## Validation

`@stdlib/joi.ts` wraps Joi with Italian messages. `JoiValidate` rejects with a `{field: message}` map (not a Joi error); controllers catch it and answer HTTP 412 via `.toJson(e)`. A Joi `ValidationError` thrown inside an action is also mapped to 412 by the route factory.

## Environment

- Cascade: `.env` ← `.env.rc` ← `.env.beta` ← `.env.local` (each overrides prev). Effective env = suffix of the last file present: `.env`→production, `.env.rc`→rc, `.env.beta`→beta, `.env.local`→development. `bootstrap.env`/`testEnv()` drive CORS and Sentry — not `NODE_ENV`.
- Env vars are typed in `env.d.ts` (`NodeJS.ProcessEnv`) but never validated at runtime — add new vars there.
- Sentry: `GLITCHTIP_DSN` + `RELEASESTAGE` (not `SENTRY_DSN`), production only
- Turnstile: skipped if `TURNSTILE_SECRET_KEY` unset
- SMTP: no auth if `SMTP_USER` unset (local dev)
- CORS: hardcoded list (`src/Http/Client/cors.ts`); origin → `*` when env is `development`

## Static serving

Express also serves the built frontend from `../www` (immutable, `maxAge: 1y`); non-`/api/*` misses serve `www/404.html`. `/images/projects` serves `@storage/images/projects`; media files are `<slug>.<ext>` (webp/png/jpg/jpeg, mp4) and URLs are built from `NEXT_PUBLIC_API` with an `?mtime` cache-buster. ETag is disabled globally (`app.disable('etag')`) — static re-enables it via `etag: true`.

## Code style

- Prettier: no semi, single quotes, trailing commas, arrow parens avoid, editorconfig
- EditorConfig: 4-space indent (2 for JSON/YAML), LF, 100 max line
- Copyright header `CC-BY-NC-ND-4.0` on every source file
- No comments in code

## Build quirks

- `tsc` alone is insufficient — `tscpaths` must run afterward to rewrite `@/` aliases to relative paths in `dist/`
- `@bin/build` also copies `.env`, `package.json`, `package-lock.json`, `src/templates` into `dist/`, and removes `dist/tsconfig.tsbuildinfo`
- `dist/` is gitignored (build artifact)
