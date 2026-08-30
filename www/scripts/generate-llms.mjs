/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { fetchProjects } from "./lib/strapi.mjs"

const root = join(import.meta.dirname, "..")
const BASE = "https://casertano.name"

const FULL_HEADER = `# Dario Casertano — Senior Full Stack Engineer

> Distributed systems, AI agents, industrial automation. Full stack across backend, frontend and real-time — from design to deployment. 15+ years of experience.

## Bio

Senior Full Stack Engineer with 15+ years of experience. Designs and builds distributed systems, autonomous AI agents and industrial automation solutions, covering the whole lifecycle: architecture, backend/frontend development, real-time and deployment.

### Core stack

Agentic AI, LangChain, OpenAI, RAG, TypeScript, Node.js, Vue, Next.js, React, Docker, Fastify, Laravel, Solidity, Ethers.js, WebRTC, MQTT, PWA.

## Services

- **Training** — PHP, Node.js, TypeScript
- **AI Agents** — autonomous agents, RAG, tool calling
- **Web & mobile apps** — PWA, SPA, offline-first applications
- **SME software** — management systems, workshops, resources
- **Monitoring & alerting** — IoT, telemetry, real-time notifications
- **API & backend** — REST, JWT, OAuth2, integrations
- **DevOps/Infrastructure** — Docker, Linux, Apache, PM2
- **CMS & migrations** — Strapi, data migrations
- **Blockchain** — smart contracts, NFT, on-chain marketplaces
- **Geospatial** — routing, isochrones, territorial coverage analysis

## Skills

### Languages & Runtimes
TypeScript, JavaScript, Node.js, PHP

### Frontend & Libraries
Vue, Vuetify, Pinia, Vuex, React, Next.js, Tailwind CSS, Vite, Chart.js, Syncfusion Gantt, Dexie.js, IndexedDB, Workbox, Service Worker, Vee-Validate, PWA

### Backend & APIs
REST API, JWT, OAuth2, Express.js, Fastify, TypeBox, Laravel, Eloquent, Zend Framework 3, Doctrine ORM, TypeORM, Drizzle ORM, Strapi 5, Dolibarr, Joi, Zod, yargs, Nodemailer, Docxtemplater, PhpWord, mPDF, Moodle, Composer

### Databases
MariaDB, PostgreSQL, MySQL, SQLite, Redis, Microsoft SQL Server, Firebase

### DevOps & Infrastructure
Docker, Docker Compose, Linux, Apache, Mosquitto, coturn, Sentry, PM2, rsync, GitHub Actions

### Tooling & Build
npm, Rollup, Terser, Lodash, Semantic Versioning, ES6 Modules, Vitest, PHPUnit, Sass, Webpack Encore, PostCSS

### Real-time & Messaging
MQTT, WebRTC, WebSocket, grammY, Telegram Bot, Gmail API, IMAP

### AI & Agents
OpenAI, OpenAI Vision, LangChain, DeepAgents, Agentic AI, RAG, Tool Calling, ReAct Pattern

### Blockchain
Solidity, Ethers.js, Polygon, ERC-721, MetaMask, IPFS, Filebase

### Geospatial
GDAL, GeoJSON, KML, TopoJSON, Geospatial ETL, Valhalla, Leaflet, OpenStreetMap

`

function tagLine(p) {
    return p.tags && p.tags.length > 0 ? ` (${p.tags.join(", ")})` : ""
}

function fullProjectLine(p) {
    return `- [${p.title}](${BASE}/progetti/${p.slug}/)${tagLine(p)} — ${p.short}`
}

function shortProjectLine(p) {
    return `- [${p.title}](${BASE}/progetti/${p.slug}/): ${p.short}`
}

async function main() {
    const projects = await fetchProjects()

    const pages = [
        `- [Home](https://casertano.name/): Portfolio homepage — hero, projects, tech stack, contact`,
        ...projects.map(shortProjectLine),
    ]

    const llmsTxt = `# Dario Casertano — Senior Full Stack Engineer
> Distributed systems, AI agents, industrial automation. Full stack across backend, frontend and real-time — from design to deployment. 15+ years of experience.

## Pages
${pages.join("\n")}

## Full content
- [llms-full.txt](https://casertano.name/llms-full.txt): Full portfolio content in markdown — bio, services, skills, projects and contact

## Contact
- Email: [dario@casertano.name](mailto:dario@casertano.name)

## Social
- [LinkedIn](https://linkedin.com/in/dariocasertano)
- [GitHub](https://github.com/DarCas)
- [Telegram](https://t.me/QuantumTip)
`

const llmsFullTxt = FULL_HEADER + `## Projects

${projects.map(fullProjectLine).join("\n")}

## Contact

- Email: [dario@casertano.name](mailto:dario@casertano.name)
- LinkedIn: https://linkedin.com/in/dariocasertano
- GitHub: https://github.com/DarCas
- Telegram: https://t.me/QuantumTip
`

    writeFileSync(join(root, "public", "llms.txt"), llmsTxt)
    writeFileSync(join(root, "public", "llms-full.txt"), llmsFullTxt)
    console.log(`llms.txt / llms-full.txt regenerated (${projects.length} projects)`)
}

main()
