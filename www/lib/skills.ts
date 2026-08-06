export interface SkillCategory {
    label: string
    items: string[]
}

export const categories: SkillCategory[] = [
    {
        label: "Linguaggi e Runtime",
        items: ["TypeScript", "Node.js", "PHP"],
    },
    {
        label: "Database",
        items: ["MariaDB", "PostgreSQL", "SQLite", "Redis", "Firebase"],
    },
    {
        label: "DevOps e Infrastruttura",
        items: ["Docker", "Docker Compose", "Linux", "Apache", "Mosquitto", "coturn", "Sentry", "PM2", "rsync"],
    },
    {
        label: "AI e Agenti",
        items: ["OpenAI", "LangChain", "DeepAgents", "Agentic AI", "RAG", "Tool Calling", "ReAct Pattern"],
    },
    {
        label: "Blockchain",
        items: ["Solidity", "Ethers.js", "Polygon", "ERC-721", "MetaMask", "IPFS", "Filebase"],
    },
    {
        label: "Real-time e Messaging",
        items: ["MQTT", "WebRTC", "WebSocket", "grammY", "Telegram Bot", "Gmail API", "IMAP"],
    },
    {
        label: "Frontend e Librerie",
        items: ["Vite", "Vuetify", "Pinia", "Vuex", "Chart.js", "Syncfusion Gantt", "Dexie.js", "Workbox", "Service Worker", "Tailwind CSS", "React", "Vue", "Next.js", "PWA"],
    },
    {
        label: "Backend e API",
        items: ["REST API", "JWT", "OAuth2", "Joi", "Docxtemplater", "Strapi 5", "Dolibarr", "Zod", "Nodemailer", "yargs", "Express.js", "Laravel", "Zend Framework 3", "TypeORM", "GDAL", "GeoJSON", "KML", "ETL Geospaziale"],
    },
]
