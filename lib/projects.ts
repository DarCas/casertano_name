export interface ProjectMedia {
    type: "image" | "video"
    src: string
    alt?: string
}

export interface Project {
    slug: string
    title: string
    short: string
    tags: string[]
    description: string
    features: string[]
    skills: string[]
    media?: ProjectMedia[]
}

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch("/api/projects")
    if (!res.ok) return []
    return res.json()
}
