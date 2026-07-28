/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export interface SkillCategory {
    label: string
    items: string[]
}

export const categories: SkillCategory[] = [
    {
        label: "Linguaggi e Runtime",
        items: ["TypeScript", "Node.js", "Vue.js", "PHP", "Laravel", "Express.js"],
    },
    {
        label: "Database",
        items: ["MariaDB", "PostgreSQL", "SQLite", "Redis", "Firebase", "TypeORM"],
    },
    {
        label: "DevOps e Infrastruttura",
        items: ["Docker", "Docker Compose", "Linux", "Apache", "Mosquitto", "Sentry"],
    },
    {
        label: "AI e Agenti",
        items: ["OpenAI", "LangChain", "Agentic AI", "RAG", "Tool Calling", "ReAct Pattern"],
    },
    {
        label: "Blockchain e Messaging",
        items: ["Solidity", "MQTT", "grammY", "Telegram Bot", "WebSocket", "PWA"],
    },
    {
        label: "Frontend e Tooling",
        items: ["Vite", "Vuetify", "Pinia", "OAuth2", "JWT", "REST API"],
    },
]
