/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const root = join(import.meta.dirname, "..")

const HEADER = `/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Project } from "./projects"

export const projectsData: Project[] = `

function readEnv(name) {
    for (const file of [".env", ".env.local"]) {
        try {
            const line = readFileSync(join(root, file), "utf-8")
                .split("\n")
                .find((l) => l.startsWith(`${name}=`))
            if (line) {
                return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "")
            }
        } catch {}
    }
    return process.env[name] ?? ""
}

async function main() {
    const base = readEnv("NEXT_PUBLIC_API")
    const out = join(root, "lib", "projects-data.ts")

    if (!base) {
        console.warn("fetch-projects.mjs: NEXT_PUBLIC_API non trovata — snapshot invariato")
        return
    }

    try {
        const res = await fetch(`${base}/projects`)
        if (res.status !== 302) {
            console.warn(`fetch-projects.mjs: risposta ${res.status} — snapshot invariato`)
            return
        }
        const json = await res.json()
        const projects = Array.isArray(json.pyld) ? json.pyld : []
        if (projects.length === 0) {
            console.warn("fetch-projects.mjs: payload vuoto — snapshot invariato")
            return
        }

        writeFileSync(out, HEADER + JSON.stringify(projects, null, 4) + "\n")
        console.log(`fetch-projects.mjs: ${projects.length} progetti → lib/projects-data.ts`)
    } catch (err) {
        console.warn(`fetch-projects.mjs: fetch fallita (${err.message}) — snapshot invariato`)
    }
}

main()
