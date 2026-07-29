/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import {Tag} from "@/components/tag"
import {categories} from "@/lib/skills"

export function Skills() {
    return (
        <section
            id="skills"
            className="py-[var(--gp)] px-8 text-center scroll-mt-[72px]"
        >
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-accent-light mb-5 block">
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
                            <Tag key={item} size="md" className="transition-all duration-200">{item}</Tag>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
