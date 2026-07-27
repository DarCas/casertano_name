"use client"

import {useEffect, useCallback} from "react"
import type {Project} from "@/lib/projects"
import {Tag} from "@/components/tag"

export function ProjectModal({project, onClose}: {project: Project; onClose: () => void}) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-modalBackdrop"
      onClick={(e) => {if (e.target === e.currentTarget) onClose()}}
    >
      <div className="bg-bg-surface border border-white/[0.08] rounded-xl max-w-[720px] w-full max-h-[90vh] overflow-y-auto relative animate-modalContent">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] text-text-secondary hover:text-text hover:border-text-secondary transition-colors duration-200 bg-bg-surface z-10"
          aria-label="Chiudi"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
        </button>

        {project.media && project.media.length > 0 ? (
          <div className="w-full aspect-video bg-bg flex items-center justify-center overflow-hidden rounded-t-xl">
            {project.media[0].type === "image" ? (
              <img src={project.media[0].src} alt={project.media[0].alt ?? project.title} className="w-full h-full object-cover" />
            ) : (
              <video src={project.media[0].src} controls className="w-full h-full object-cover" />
            )}
          </div>
        ) : (
          <div className="w-full aspect-video bg-bg overflow-hidden rounded-t-xl">
            <img src={`https://placehold.co/720x405/1E1E22/6C63FF?text=${encodeURIComponent(project.title)}`} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <div>
              <h3 className="font-mono text-[1.1rem]">{project.title}</h3>
              <div className="flex flex-wrap gap-[6px] mt-2">
                {project.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>

          <p className="text-text-secondary text-[0.9rem] leading-[1.7] mb-6">{project.description}</p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

          <ul className="space-y-3 mb-8">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.85rem] leading-[1.6] text-text-secondary">
                <span className="mt-[5px] w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

          <span className="font-mono text-[0.65rem] text-accent uppercase tracking-[0.1em] block mb-3">Skills dimostrate</span>
          <div className="flex flex-wrap gap-[6px]">
            {project.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
