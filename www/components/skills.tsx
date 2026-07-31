/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import {Tag} from "@/components/tag"
import {SectionLabel} from "@/components/section-label"
import {categories} from "@/lib/skills"

export function Skills() {
    return (
        <section
            id="skills"
            className="py-[var(--gp)] px-8 text-center scroll-mt-[72px]"
        >
            <SectionLabel className="mb-5">// tech stack</SectionLabel>
            <h2 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">
                Cosa uso
            </h2>
            <p className="text-text-secondary mb-10">
                Linguaggi, runtime, database, AI. Ogni tecnologia ha un perché.
            </p>
            <div className="flex flex-col gap-8 max-w-[700px] mx-auto">
                {categories.map((cat) => (
                    <div key={cat.label}>
                        <SectionLabel size="sm" color="secondary" className="mb-3">{`// ${cat.label}`}</SectionLabel>
                        <div className="flex flex-wrap justify-center gap-2">
                            {cat.items.map((item) => (
                            <Tag key={item} size="md" className="transition-all duration-200">{item}</Tag>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
