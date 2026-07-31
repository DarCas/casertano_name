/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { SectionLabel } from "@/components/section-label"
import { fetchProjects } from "@/lib/projects"
import { projectsData } from "@/lib/projects-data"
import type { Project } from "@/lib/projects"

export function Projects() {
    const [projects, setProjects] = useState<Project[]>(projectsData)

    useEffect(() => {
        fetchProjects().then((data) => {
            if (data.length > 0) setProjects(data)
        })
    }, [])

    return (
        <section id="progetti"
                 className="py-[var(--gp)] px-8 max-w-[1100px] mx-auto scroll-mt-[72px]">
            <SectionLabel className="mb-5">// progetti</SectionLabel>
            <h2 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">
                Cosa ho costruito
            </h2>
            <p className="text-text-secondary mb-10">
                Una selezione di ciò che ho realizzato. Dall'idea al deploy: AI, blockchain, IoT, real-time. Il filo comune? Stack eterogenei, zero template.
            </p>
            {projects.length === 0 ? (
                <p className="text-text-secondary">Nessun progetto disponibile.</p>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
                    {projects.map((p) => (
                        <ProjectCard key={p.slug} project={p}/>
                    ))}
                </div>
            )}
        </section>
    )
}
