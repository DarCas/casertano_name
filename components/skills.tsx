/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

function hashDelay(s: string): number {
    let h = 0
    for (let i = 0; i < s.length; i++) h = ( ( h << 5 ) - h + s.charCodeAt(i) ) | 0
    return ( Math.abs(h) % 200 ) / 100
}

export const categories: { label: string; items: string[] }[] = [
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

export function Skills() {
    return (
        <section
            id="skills"
            className="py-[var(--gp)] px-8 text-center scroll-mt-[72px]"
        >
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-accent mb-5 block">
                // competenze
            </span>
            <h2 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">
                Tech Stack
            </h2>
            <p className="text-text-secondary mb-10">
                Tecnologie e strumenti padroneggiati nei progetti.
            </p>
            <div className="flex flex-col gap-8 max-w-[700px] mx-auto">
                {categories.map((cat) => (
                    <div key={cat.label}>
                        <span className="font-mono text-[0.6rem] tracking-[0.12em] text-text-secondary block mb-3">
                            {`// ${cat.label}`}
                        </span>
                        <div className="flex flex-wrap justify-center gap-2">
                            {cat.items.map((item) => (
                                <span
                                    key={item}
                                    className="font-mono text-[0.65rem] px-[14px] py-[6px] rounded-full bg-bg-surface border border-white/[0.06] text-text-secondary transition-all duration-200 animate-tagHeroGlow"
                                    style={{animationDelay: `${hashDelay(item)}s`}}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
