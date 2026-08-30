/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { fetchProjects } from "./lib/strapi.mjs"

const root = join(import.meta.dirname, "..")

const HEADER = `/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Project } from "./projects"

export const projectsData: Project[] = `

;( async function () {
    const out = join(root, "lib", "projects-data.ts")

    const projects = await fetchProjects()

    writeFileSync(out, HEADER + JSON.stringify(projects, null, 4) + "\n")

    console.log(`fetch-projects.mjs: ${projects.length} progetti → lib/projects-data.ts`)
} )()
