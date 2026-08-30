# Strapi CMS

Headless CMS for the portfolio website of Dario Casertano.

![Strapi 5](https://img.shields.io/badge/Strapi-5.52-2E7EEA?logo=strapi&logoColor=white&style=for-the-badge)
![Node.js 22](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white&style=for-the-badge)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)

[![CC BY-NC-ND 4.0](https://img.shields.io/badge/license-CC_BY--NC--ND_4.0-E9347A?style=for-the-badge&logo=creativecommons&logoColor=white)](../LICENSE.md)

## Overview

Strapi 5 headless CMS that stores and serves portfolio project data for the `www/` frontend via a REST API. Runs as a standalone Docker container on port 1337.

- **Content API** at `/api/projects` (CRUD, draft & publish).
- **Admin panel** at `/admin` for content management.
- **MCP server** enabled (`/mcp`) for agent-driven content operations.
- **Local upload** provider for project media (images + videos, 10 MB limit).

## Features

- **Single content type** — `Project` with title, slug, short description, rich text body, features, skills, tags, sort order, optional `lib` flag, GitHub/website URLs, and media attachments.
- **Draft & publish** workflow — projects can be drafted before going live.
- **MCP integration** — Strapi MCP server enabled for agent access (token in `.secrets/strapi-mcp-token`).
- **Upload restrictions** — only `image/*` and `video/*` MIME types; SVG, executables, and shell scripts denied.
- **robots.txt** — blocks all crawlers except `/uploads/` (media served to crawlers).
- **API token auth** — read-only or full-access tokens for the Content API.
- **Users & permissions** — JWT-based admin auth with session management.

## Getting started

Requirements: **Node.js 22** (`.nvmrc`), npm.

```bash
npm install
cp .env.dist .env          # then edit with your values
npm run dev                 # Strapi develop on :1337
```

On first start, Strapi creates the SQLite database at the path in `DATABASE_FILENAME` (default `.tmp/data.db`). You'll be prompted to create an admin user.

## Commands

All commands run from the `strapi/` directory.

| Action | Command |
|---|---|
| Dev (hot-reload) | `npm run dev` |
| Build (admin panel) | `npm run build` |
| Start (production) | `npm start` |
| Strapi CLI | `npm run strapi -- <command>` |
| Upgrade | `npm run upgrade` |

> **Note:** `npm run build` compiles the admin panel. It is required before `npm start` but not needed during development (`npm run dev` handles it).

## Content model

### `Project` (collectionType)

| Field | Type | Notes |
|---|---|---|
| `title` | string (max 60) | required, unique |
| `slug` | uid (from `title`) | required |
| `short` | string (max 500) | required — project summary |
| `description` | richtext | required — full project description |
| `features` | component (repeatable) | `project.feature` → `{ name: string }` |
| `skills` | component (repeatable) | `project.skill` → `{ name: string }` |
| `tags` | component (repeatable) | `project.tag` → `{ name: string }` |
| `sort_order` | integer | required, default `0` |
| `lib` | boolean | default `false` — marks open-source libraries |
| `github` | string | unique — GitHub repo URL |
| `website` | string | unique — project live URL |
| `media` | media (multiple) | images + videos, optional |

### Components

| Component | Collection | Fields |
|---|---|---|
| `project.feature` | `components_project_features` | `name` (string, required) |
| `project.skill` | `components_project_skills` | `name` (string, required) |
| `project.tag` | `components_project_tags` | `name` (string, required) |

## API

### Content API

All endpoints are under `/api` and follow the standard Strapi REST conventions.

#### `GET /api/projects`

Returns published projects. Supports query params: `filters`, `sort`, `pagination`, `populate`.

#### `POST /api/projects`

Creates a new project. Requires admin or full-access API token.

#### `PUT /api/projects/:id`

Updates an existing project. Requires admin or full-access API token.

#### `DELETE /api/projects/:id`

Deletes a project. Requires admin or full-access API token.

### Authentication

- **Admin panel** (`/admin`) — JWT auth with refresh tokens, session-based.
- **Content API** — API tokens (read-only or full-access) passed via `Authorization: Bearer <token>`.
- The `www/` frontend uses a Content API token (`NEXT_PUBLIC_CMS_API_TOKEN`) to fetch published projects.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `ADMIN_JWT_SECRET` | yes | Admin panel JWT secret |
| `APP_KEYS` | yes | Comma-separated keys for Strapi internals |
| `API_TOKEN_SALT` | yes | Salt for API token encryption |
| `JWT_SECRET` | yes | Users-permissions JWT secret |
| `ENCRYPTION_KEY` | yes | Encryption key for secrets |
| `TRANSFER_TOKEN_SALT` | yes | Salt for transfer tokens |
| `DATABASE_FILENAME` | no | SQLite file path (default `.tmp/data.db`) |
| `HOST` | no | Bind address (default `0.0.0.0`) |
| `PORT` | no | Listen port (default `1337`) |

Notes:

- Copy `.env.dist` to `.env` and replace placeholder values.
- Secrets are in `.secrets/` (gitignored) — `strapi-mcp-token` for MCP access.
- No `.env` cascade like `api/` — only `.env` (and `.env.local` for overrides).

## Architecture

```
.
├── src/
│   ├── api/
│   │   └── project/          → Project content type (core factories)
│   │       ├── content-types/project/schema.json
│   │       ├── controllers/project.ts
│   │       ├── routes/project.ts
│   │       └── services/project.ts
│   ├── components/
│   │   └── project/          → Reusable components (feature, skill, tag)
│   └── index.ts              → Bootstrap & register hooks
├── config/
│   ├── admin.ts              → Admin panel config (JWT, API tokens, transfer)
│   ├── api.ts                → REST defaults (limit 25/100, withCount)
│   ├── database.ts           → SQLite connection
│   ├── middlewares.ts         → Strapi middleware stack
│   ├── plugins.ts            → Upload config (local, 10MB, MIME filter) + users-permissions
│   ├── server.ts             → Host, port, MCP enabled
│   └── typescript.ts         → Auto-generate types
├── database/migrations/      → Auto-generated migrations
├── data/                     → SQLite database file
├── public/
│   ├── uploads/              → Uploaded media files
│   └── robots.txt            → Disallow all, Allow /uploads/
├── types/generated/          → Auto-generated TypeScript definitions
├── .env.dist                 → Environment template
├── .secrets/                 → Runtime secrets (gitignored)
├── Dockerfile                → Multi-stage build (node:22-alpine)
├── tsconfig.json             → CommonJS, ES2019, strict
└── package.json              → Strapi 5.52.2 dependencies
```

## Build & deployment

```bash
npm run build    # compile admin panel
npm start        # Strapi production server
```

## License

Distributed under [CC BY-NC-ND 4.0](../LICENSE.md) — © 2026 Casertano Dario. All rights reserved.
