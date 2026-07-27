/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export interface ProjectMedia {
    alt?: string
    src: string
    type: "image" | "video"
}

export interface Project {
    description: string
    features: string[]
    media?: ProjectMedia[]
    short: string
    skills: string[]
    slug: string
    tags: string[]
    title: string
}

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/projects`)
    if (!res.ok) return []
    return res.json()
}
