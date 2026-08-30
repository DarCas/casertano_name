/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export interface ProjectMedia {
    alt?: string
    formats?: {
        large?: string
        medium?: string
        small?: string
        thumbnail?: string
    }
    src: string
    type: "image" | "video"
}

export interface Project {
    description: string
    features: string[]
    github?: string
    lib?: boolean
    media?: ProjectMedia[]
    short: string
    skills: string[]
    slug: string
    sort_order?: number
    tags: string[]
    title: string
    website?: string
}

export async function fetchProjects(): Promise<Project[]> {
    if (!process.env.NEXT_PUBLIC_CMS_API) throw new Error("NEXT_PUBLIC_CMS_API non impostata")
    if (!process.env.NEXT_PUBLIC_CMS_API_TOKEN) throw new Error("NEXT_PUBLIC_CMS_API_TOKEN non impostata")

    const url = new URL('/api/projects', process.env.NEXT_PUBLIC_CMS_API)
    url.searchParams.set('pagination[pageSize]', '100')
    url.searchParams.set('populate', '*')
    url.searchParams.set('sort', 'sort_order:asc')

    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CMS_API_TOKEN}`,
        },
    })

    if (!res.ok) throw new Error(`Strapi /projects ${res.status}`)

    const json = await res.json()
    return ( json.data ?? [] ).map((p: any) => ( {
        description: p.description,
        features: ( p.features ?? [] ).map((f: any) => f.name),
        github: p.github ?? undefined,
        lib: p.lib ?? false,
        media: ( p.media ?? [] ).map((m: any) => ( {
            alt: m.alternativeText ?? undefined,
            formats: m.formats
                ? Object.fromEntries(
                    Object.entries(m.formats).map(([ k, f ]: [ string, any ]) => [ k, f.url.startsWith("http") ? f.url : `${url.origin}${f.url}` ]),
                )
                : undefined,
            src: m.url.startsWith("http") ? m.url : `${url.origin}${m.url}`,
            type: m.mime?.startsWith("video/") ? "video" as const : "image" as const,
        } )),
        short: p.short,
        skills: ( p.skills ?? [] ).map((s: any) => s.name),
        slug: p.slug,
        sort_order: p.sort_order ?? 0,
        tags: ( p.tags ?? [] ).map((t: any) => t.name),
        title: p.title,
        website: p.website ?? undefined,
    } ))
}

export function sortProjects(projects: Project[]): Project[] {
    const nonLib = projects.filter((p) => !p.lib)
        .sort((a, b) => ( a.sort_order ?? 0 ) - ( b.sort_order ?? 0 ))

    const lib = projects.filter((p) => p.lib)
        .sort((a, b) => a.title.localeCompare(b.title, "it"))

    return [
        ...nonLib,
        ...lib,
    ]
}
