export interface SkillCategory {
    label: string
    items: string[]
}

export const categories: SkillCategory[] = [
    {
        label: "Languages & Runtimes",
        items: ["TypeScript", "JavaScript", "Node.js", "PHP"],
    },
    {
        label: "Frontend & Libraries",
        items: ["Vue", "Vuetify", "Pinia", "Vuex", "React", "Next.js", "Tailwind CSS", "Vite", "Chart.js", "Syncfusion Gantt", "Dexie.js", "IndexedDB", "Workbox", "Service Worker", "Vee-Validate", "PWA"],
    },
    {
        label: "Backend & APIs",
        items: ["REST API", "JWT", "OAuth2", "Express.js", "Fastify", "TypeBox", "Laravel", "Eloquent", "Zend Framework 3", "Doctrine ORM", "TypeORM", "Drizzle ORM", "Strapi", "Dolibarr", "Joi", "Zod", "yargs", "Nodemailer", "Docxtemplater", "PhpWord", "mPDF", "Moodle", "Composer"],
    },
    {
        label: "Databases",
        items: ["MariaDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Microsoft SQL Server", "Firebase"],
    },
    {
        label: "DevOps & Infrastructure",
        items: ["Docker", "Docker Compose", "Linux", "Apache", "Mosquitto", "coturn", "Sentry", "PM2", "rsync", "GitHub Actions", "GitHub Pages"],
    },
    {
        label: "Tooling & Build",
        items: ["npm", "Rollup", "Terser", "Lodash", "Semantic Versioning", "ES6 Modules", "Vitest", "PHPUnit", "Sass", "Webpack Encore", "PostCSS"],
    },
    {
        label: "Real-time & Messaging",
        items: ["MQTT", "WebRTC", "WebSocket", "grammY", "Telegram Bot", "Gmail API", "IMAP"],
    },
    {
        label: "AI & Agents",
        items: ["OpenAI", "OpenAI Vision", "LangChain", "DeepAgents", "Agentic AI", "RAG", "Tool Calling", "ReAct Pattern"],
    },
    {
        label: "Blockchain",
        items: ["Solidity", "Ethers.js", "Polygon", "ERC-721", "MetaMask", "IPFS", "Filebase"],
    },
    {
        label: "Geospatial",
        items: ["GDAL", "GeoJSON", "KML", "TopoJSON", "Geospatial ETL", "Valhalla", "Leaflet", "OpenStreetMap"],
    },
]