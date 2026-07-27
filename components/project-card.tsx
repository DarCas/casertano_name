/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import type {Project} from "@/lib/projects"
import {Tag} from "@/components/tag"

export function ProjectCard({project, onSelect}: {project: Project; onSelect: () => void}) {
  const img = project.media?.[0]

  return (
    <div
      className="bg-bg-surface border border-white/[0.06] rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {img ? (
        <div className="w-full aspect-[2/1] bg-bg overflow-hidden">
          {img.type === "image" ? (
            <img src={img.src} alt={img.alt ?? project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <video src={img.src} className="w-full h-full object-cover" />
          )}
        </div>
      ) : (
        <div className="w-full aspect-[2/1] bg-bg overflow-hidden">
          <img src={`https://placehold.co/600x300/1E1E22/6C63FF?text=${encodeURIComponent(project.title)}`} alt={project.title} className="w-full h-full object-cover" />
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
    </div>
  )
}
