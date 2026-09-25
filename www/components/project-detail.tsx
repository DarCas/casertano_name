/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { BackToTop } from "@/components/back-to-top";
import type { Project } from "@/lib/projects"
import { Tag } from "@/components/tag"
import { SectionLabel } from "@/components/section-label"

export function ProjectDetail({ project }: { project: Project }) {
    const media = project.media?.[0]

    return (
        <div className="flex flex-col gap-10">
            <div className="w-full aspect-[2/1] bg-bg overflow-hidden rounded-lg">
                {media ? (
                    media.type === "image" ? (
                        <img src={media.src} alt={media.alt ?? project.title} fetchPriority="high" className="w-full h-full object-cover"/>
                    ) : (
                        <video src={media.src} controls className="w-full h-full object-cover"/>
                    )
                ) : (
                    <img src={`https://placehold.co/720x360/1E1E22/6C63FF?text=${encodeURIComponent(project.title)}`} alt={project.title} className="w-full h-full object-cover"/>
                )}
            </div>

            <div className="max-w-[720px] mx-auto">
                <p className="text-text-secondary text-[0.9rem] leading-[1.7] mb-10">{project.description}</p>

                <div className="mb-10">
                    <SectionLabel size="md" color="secondary" className="mb-4">// features</SectionLabel>
                    <ul className="space-y-3">
                        {project.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-[0.85rem] leading-[1.7] text-text-secondary">
                                <span className="font-mono text-accent text-[0.8rem] leading-[1.7] shrink-0">&raquo;</span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <SectionLabel size="md" color="secondary" className="mb-4">// skills</SectionLabel>
                    <div className="flex flex-wrap gap-[6px]">
                        {project.skills.map((s) => (
                            <Tag key={s}>{s}</Tag>
                        ))}
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                    {project.website ? (
                        <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Esplora il progetto — ${project.title}`}
                            className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-text-secondary no-underline border border-white/[0.08] rounded-full px-4 py-1.5 transition-colors duration-200 hover:border-accent hover:text-accent whitespace-nowrap"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            esplora il progetto
                        </a>
                    ) : project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Codice sorgente su GitHub — ${project.title}`}
                            className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-text-secondary no-underline border border-white/[0.08] rounded-full px-4 py-1.5 transition-colors duration-200 hover:border-accent hover:text-accent whitespace-nowrap"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            codice sorgente
                        </a>
                    ) : null}
                    <BackToTop align="right" className="mt-0 ml-0 sm:ml-auto"/>
                </div>
            </div>
        </div>
    )
}
