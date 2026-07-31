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
                        <img src={media.src} alt={media.alt ?? project.title} className="w-full h-full object-cover"/>
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

                <BackToTop align="right"/>
            </div>
        </div>
    )
}
