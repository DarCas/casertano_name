"use client"

import {useState} from "react"
import {ProjectCard} from "@/components/project-card"
import {ProjectModal} from "@/components/project-modal"
import projects from "@/lib/projects"

export function Projects() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="progetti" className="py-[var(--gp)] px-8 max-w-[1100px] mx-auto scroll-mt-[72px]">
      <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-accent mb-5 block">// progetti</span>
      <h2 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">Progetti selezionati</h2>
      <p className="text-text-secondary mb-10">Soluzioni full-stack realizzate per monitoring industriale, AI, telegram bot e gestione territoriale.</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} onSelect={() => setSelected(i)} />
        ))}
      </div>
      {selected !== null && (
        <ProjectModal project={projects[selected]} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
