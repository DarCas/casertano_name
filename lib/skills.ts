export interface SkillCategory {
    label: string
    items: string[]
}

export const categories: SkillCategory[] = [
    {
        label: "Linguaggi e Runtime",
        items: ["TypeScript", "Node.js", "Next.js", "React", "Vue 2", "Vue 3", "PHP", "Laravel", "Express.js", "Zend Framework 3"],
    },
    {
        label: "Database",
        items: ["MariaDB", "PostgreSQL", "SQLite", "Redis", "Firebase", "TypeORM"],
    },
    {
        label: "DevOps e Infrastruttura",
        items: ["Docker", "Docker Compose", "Linux", "Apache", "Mosquitto", "Sentry", "PM2", "coturn"],
    },
    {
        label: "AI e Agenti",
        items: ["OpenAI", "LangChain", "Agentic AI", "RAG", "Tool Calling", "ReAct Pattern"],
    },
    {
        label: "Blockchain",
        items: ["Solidity", "Ethers.js", "MetaMask", "IPFS", "Filebase"],
    },
    {
        label: "Real-time e Messaging",
        items: ["MQTT", "WebRTC", "WebSocket", "grammY", "Telegram Bot", "Gmail API", "IMAP", "PWA"],
    },
    {
        label: "Frontend e Librerie",
        items: ["Vite", "Vuetify", "Pinia", "Vuex", "Chart.js", "Syncfusion Gantt", "Dexie.js", "Workbox", "Service Worker", "Tailwind CSS"],
    },
    {
        label: "Backend e API",
        items: ["REST API", "JWT", "OAuth2", "Joi", "Docxtemplater", "Strapi 5", "Zod", "Nodemailer"],
    },
    {
        label: "Geospatial e GIS",
        items: ["GDAL", "ETL Geospaziale"],
    },
]