/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { HomeArrow } from "@/components/home-arrow"
import { SectionLabel } from "@/components/section-label"
import { ProjectDetail } from "@/components/project-detail"
import { projectsData } from "@/lib/projects-data"
import type { Project } from "@/lib/projects"

const BASE = "https://casertano.name"

export function generateStaticParams() {
    return projectsData.map((p) => ( {slug: p.slug} ))
}

export async function generateMetadata({params}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const {slug} = await params
    const project = projectsData.find((p) => p.slug === slug)
    if (!project) return {}

    const url = `${BASE}/progetti/${slug}/`
    const title = `${project.title} — Dario Casertano`
    const image = project.media?.[ 0 ]?.type === "image" ? project.media[ 0 ].src : undefined

    return {
        alternates: {
            canonical: url,
        },
        description: project.short,
        openGraph: {
            description: project.short,
            images: image,
            locale: "it_IT",
            siteName: "Dario Casertano",
            title,
            type: "website",
            url,
        },
        title,
        twitter: {
            card: "summary_large_image",
            description: project.short,
            images: image,
            title,
        },
    }
}

function projectJsonLd(project: Project, url: string) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@id": url,
                "@type": "SoftwareApplication",
                applicationCategory: "BusinessApplication",
                description: project.description,
                image: project.media?.[ 0 ]?.src,
                inLanguage: "it",
                keywords: project.tags.join(", "),
                name: project.title,
                operatingSystem: "Web",
                url,
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {"@type": "ListItem", position: 1, name: "Home", item: `${BASE}/`},
                    {"@type": "ListItem", position: 2, name: project.title, item: url},
                ],
            },
        ],
    }
}

export default async function ProjectPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const project = projectsData.find((p) => p.slug === slug)
    if (!project) notFound()

    const url = `${BASE}/progetti/${slug}/`

    return (
        <>
            <Nav/>
            <div className="max-w-[1100px] mx-auto px-8 pt-[120px] pb-[60px]">
                <SectionLabel className="mb-3">// progetti</SectionLabel>
                <div className="flex items-baseline gap-4 mb-2">
                    <HomeArrow defaultHash="#progetti"/>
                    <h1 className="font-mono text-[clamp(1.4rem,3vw,2rem)]">{project.title}</h1>
                </div>
                <p className="text-text-secondary max-w-[720px] mb-10">{project.short}</p>

                <ProjectDetail project={project}/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(projectJsonLd(project, url))}}
                />
            </div>
            <Footer/>
        </>
    )
}
