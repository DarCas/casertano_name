/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useState, useEffect, useRef } from "react"
import type { Project, ProjectMedia as ProjectMediaType } from "@/lib/projects"
import { Tag } from "@/components/tag"

function ProjectMedia({ img, title }: { img: ProjectMediaType; title: string }) {
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imgRef.current?.complete) setLoaded(true)
    }, [])

    return (
        <div className="w-full aspect-[2/1] bg-bg overflow-hidden relative">
            {!loaded && <div className="absolute inset-0 skeleton !rounded-none" />}
            {img.type === "image" ? (
                <img
                    ref={imgRef}
                    src={img.src}
                    alt={img.alt ?? title}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
            ) : (
                <video src={img.src} className="w-full h-full object-cover" />
            )}
        </div>
    )
}

function GitHubBanner({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Codice sorgente su GitHub — ${label}`}
            className="relative z-[2] flex items-center justify-center gap-2 py-3 font-mono text-[0.6rem] tracking-[0.08em] text-text-secondary bg-bg-surface-hover border-t border-white/10 transition-colors duration-300 hover:text-accent-secondary"
        >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Open Source
        </a>
    )
}

export function ProjectCard({ project }: { project: Project }) {
    const img = project.media?.[0]

    return (
        <div className="bg-bg-surface border border-white/[0.06] rounded-xl transition-all duration-300 relative overflow-hidden group flex flex-col hover:border-accent/40">
            <a href={`/progetti/${project.slug}/`} aria-label={project.title} className="absolute inset-0 z-[1]" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            {img ? (
                <ProjectMedia img={img} title={project.title} />
            ) : (
                <div className="w-full aspect-[2/1] bg-bg overflow-hidden">
                    <img src={`https://placehold.co/600x300/1E1E22/6C63FF?text=${encodeURIComponent(project.title)}`} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="p-7 flex flex-1 flex-col">
                <h3 className="font-mono text-[0.95rem] mb-2 flex items-center gap-2">
                    {project.title}
                </h3>
                <p className="text-text-secondary text-[0.88rem] leading-[1.6] mb-3">{project.short}</p>
                <div className="flex flex-wrap gap-[6px] mt-auto">
                    {project.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </div>
            </div>

            {project.github && <GitHubBanner href={project.github} label={project.title} />}
        </div>
    )
}
