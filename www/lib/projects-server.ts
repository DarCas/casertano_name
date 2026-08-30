/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { fetchProjects, sortProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects"

export async function getProjects(): Promise<Project[]> {
    const projects = await fetchProjects()
    return sortProjects(projects)
}
