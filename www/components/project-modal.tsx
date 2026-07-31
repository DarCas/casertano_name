/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import {useEffect, useCallback, useState} from "react"
import type {Project} from "@/lib/projects"
import {Tag} from "@/components/tag"
import {SectionLabel} from "@/components/section-label"

export function ProjectModal({project, onClose}: {project: Project; onClose: () => void}) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  const [mediaLoaded, setMediaLoaded] = useState(false)

  useEffect(() => {
    setMediaLoaded(false)
  }, [project.slug])

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
    >
      <div className="bg-bg-surface border border-white/[0.08] rounded-xl max-w-[720px] w-full max-h-[90vh] overflow-hidden flex flex-col animate-modalContent">
        {/* Window chrome bar */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.04] rounded-t-xl bg-bg/85 backdrop-blur-md">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-accent text-[0.8rem] leading-none shrink-0">$</span>
            <span className="font-mono text-[0.8rem] text-text-secondary truncate">{project.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text hover:bg-white/[0.08] transition-colors duration-200"
            aria-label="Chiudi"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Accent line */}
        <div className="shrink-0 h-px bg-gradient-to-r from-accent to-accent-secondary" />

        {/* Media */}
        <div className="shrink-0 w-full aspect-video bg-bg relative">
          {project.media && project.media.length > 0 ? (
            <>
              {!mediaLoaded && <div className="absolute inset-0 skeleton !rounded-none" />}
              {project.media[0].type === "image" ? (
                <img
                  src={project.media[0].src}
                  alt={project.media[0].alt ?? project.title}
                  onLoad={() => setMediaLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${mediaLoaded ? "opacity-100" : "opacity-0"}`}
                />
              ) : (
                <video src={project.media[0].src} controls className="w-full h-full object-cover" />
              )}
            </>
          ) : (
            <img src={`https://placehold.co/720x405/1E1E22/6C63FF?text=${encodeURIComponent(project.title)}`} alt={project.title} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Accent line */}
        <div className="shrink-0 h-px bg-gradient-to-r from-accent to-accent-secondary" />

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="space-y-8">
            <p className="text-text-secondary text-[0.9rem] leading-[1.7]">{project.description}</p>

            <div>
              <SectionLabel size="md" color="secondary" className="mb-3">// features</SectionLabel>
              <div className="bg-bg border border-white/[0.04] rounded-lg p-4 sm:p-5">
                <ul className="space-y-2.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.85rem] leading-[1.6] text-text-secondary">
                      <span className="font-mono text-accent text-[0.8rem] leading-[1.6] shrink-0">&raquo;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <SectionLabel size="md" color="secondary" className="mb-3">// skills</SectionLabel>
              <div className="bg-bg border border-white/[0.04] rounded-lg p-4 sm:p-5">
                <div className="flex flex-wrap gap-[6px]">
                  {project.skills.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
