"use client"

import type {Project} from "@/lib/projects"

export function ProjectCard({project, onSelect}: {project: Project; onSelect: () => void}) {
  return (
    <div
      className="bg-bg-surface border border-white/[0.06] rounded-xl p-7 transition-all duration-300 cursor-pointer relative overflow-hidden group"
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
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="text-2xl mb-3">{project.icon}</div>
      <h3 className="font-mono text-[0.95rem] mb-2 flex items-center gap-2">
        {project.title}
        <span className="text-accent-secondary text-[0.6rem]">↗</span>
      </h3>
      <p className="text-text-secondary text-[0.88rem] leading-[1.6] mb-3">{project.short}</p>
      <div className="flex flex-wrap gap-[6px]">
        {project.tags.map((t) => (
          <span key={t} className="font-mono text-[0.6rem] px-[10px] py-[3px] rounded-full bg-accent/[0.12] text-white">{t}</span>
        ))}
      </div>
    </div>
  )
}
