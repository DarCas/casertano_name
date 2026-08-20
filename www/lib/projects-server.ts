/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { projectsData } from "@/lib/projects-data"
import { fetchProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects"

export async function getProjects(): Promise<Project[]> {
    if (process.env.NODE_ENV !== "development") return projectsData

    try {
        const live = await fetchProjects()
        if (live.length > 0) return live
    } catch {}

    return projectsData
}
