# Dario Casertano's Personal Portfolio

[![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express.js](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Node.js 22](https://img.shields.io/badge/Node.js_22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)

[![CC BY-NC-ND 4.0](https://img.shields.io/badge/license-CC_BY--NC--ND_4.0-E9347A?style=for-the-badge&logo=creativecommons&logoColor=white)](LICENSE.md)

> This repository is intended for **illustrative and educational purposes** only. It is not a product designed for general use, nor is it offered as a ready-made solution for third parties. Some files useful for development or deployment may not be published.

## Disclaimer

The code is provided "as is", without any express or implied warranty. There is no obligation for ongoing maintenance or updates. The author **assumes no responsibility** for any direct or indirect damages arising from its use.

## Structure

```
.
├── www/      — Next.js 15 frontend (static export)
├── api/      — Express.js 4 backend (REST API + static file server)
├── Dockerfile
├── docker-compose.yml
├── optimize-images.sh
├── postman_collection.json
└── LICENSE.md
```

| Directory | Description |
|---|---|
| [`www/`](www/README.md) | Static Next.js 15 site with App Router, React 19, and Tailwind CSS. Built and exported to `out/`. |
| [`api/`](api/README.md) | Express.js 4 server: REST API v1 (`/api/v1`) and static file serving for the frontend. |

In production both layers run inside a **single Docker container** (Node.js 22 Alpine, 128 MB memory). Express serves both the API and the pre-built site on port 3001.

## Quick start

```bash
docker compose up -d
```

For local development, see the [`www/`](www/README.md) and [`api/`](api/README.md) READMEs.

## Docker

The image is built in **three stages** (multi-stage build):

1. **`frontend-builder`** — `node:22-alpine`: installs `www/` dependencies, runs `npm run build` (Next.js static export → `out/`).
2. **`api-builder`** — `node:22-alpine`: compiles the API TypeScript (`./@bin/build`), then `npm prune --omit=dev` to keep only production dependencies.
3. **Production** — `node:22-alpine`: copies the static frontend (`www/out/`), the compiled API (`dist/`), and production `node_modules`. Includes `bash`, `nano`, and `libwebp-tools` for maintenance utilities.

The container starts Express with `node api/src/index.js api` on port 3001. Memory is limited to 128 MB.

## License

Distributed under the [CC BY-NC-ND 4.0](LICENSE.md) license — © 2026 Casertano Dario. All rights reserved.
