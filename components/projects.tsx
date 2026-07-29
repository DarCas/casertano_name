/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectModal } from "@/components/project-modal"
import { fetchProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects"

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<number | null>(null)

    useEffect(() => {
        fetchProjects().then((data) => {
            setProjects(data)
            setLoading(false)
        })
    }, [])

    return (
        <section id="progetti"
                 className="py-[var(--gp)] px-8 max-w-[1100px] mx-auto scroll-mt-[72px]">
      <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-accent-light mb-5 block">
        // progetti
      </span>
            <h2 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">
                Progetti selezionati
            </h2>
            <p className="text-text-secondary mb-10">
                Soluzioni full-stack realizzate per monitoring industriale, AI, telegram bot e
                gestione territoriale.
            </p>
            {loading ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
                    {Array.from({length: 1}).map((_, i) => (
                        <div key={i}
                             className="bg-bg-surface border border-white/[0.06] rounded-xl overflow-hidden">
                            <div className="w-full aspect-[2/1] skeleton"/>
                            <div className="p-7 flex flex-col gap-3">
                                <div className="h-5 w-3/4 skeleton"/>
                                <div className="h-4 w-full skeleton"/>
                                <div className="h-4 w-5/6 skeleton"/>
                                <div className="flex gap-2 mt-2">
                                    <div className="h-5 w-16 skeleton"/>
                                    <div className="h-5 w-20 skeleton"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <p className="text-text-secondary">Nessun progetto disponibile.</p>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.slug} project={p} onSelect={() => setSelected(i)}/>
                    ))}
                </div>
            )}
            {selected !== null && projects[ selected ] && (
                <ProjectModal project={projects[ selected ]} onClose={() => setSelected(null)}/>
            )}
        </section>
    )
}
