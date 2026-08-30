/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = join(import.meta.dirname, "..", "..")

export function readEnv(name) {
    for (const file of [".env", ".env.local"]) {
        try {
            const line = readFileSync(join(root, file), "utf-8")
                .split("\n")
                .find((l) => l.startsWith(`${name}=`))

            if (line) {
                return line.slice(name.length + 1)
                    .trim()
                    .replace(/^["']|["']$/g, "")
            }
        } catch {
        }
    }

    return process.env[ name ] ?? ""
}

export async function fetchProjects() {
    const NEXT_PUBLIC_CMS_API = readEnv("NEXT_PUBLIC_CMS_API")
    const NEXT_PUBLIC_CMS_API_TOKEN = readEnv("NEXT_PUBLIC_CMS_API_TOKEN")

    if (!NEXT_PUBLIC_CMS_API) throw new Error("NEXT_PUBLIC_CMS_API non trovata")
    if (!NEXT_PUBLIC_CMS_API_TOKEN) throw new Error("NEXT_PUBLIC_CMS_API_TOKEN non trovata")

    const url = new URL('/api/projects', NEXT_PUBLIC_CMS_API)
    url.searchParams.set('pagination[pageSize]', '100')
    url.searchParams.set('populate', '*')
    url.searchParams.set('sort', 'sort_order:asc')

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${NEXT_PUBLIC_CMS_API_TOKEN}`,
            },
        })

        if (!res.ok) throw new Error(`Strapi /projects ${res.status}`)

        const json = await res.json()
        const raw = json.data ?? []

        if (raw.length === 0) throw new Error(`Strapi non ha restituito progetti`)

        return raw.map((p) => ( {
            description: p.description,
            features: ( p.features ?? [] ).map((f) => f.name),
            github: p.github ?? undefined,
            lib: p.lib ?? false,
            media: ( p.media ?? [] ).map((m) => ( {
                src: m.url.startsWith("http") ? m.url : `${url.origin}${m.url}`,
                type: m.mime?.startsWith("video/") ? "video" : "image",
                alt: m.alternativeText ?? undefined,
                formats: m.formats
                    ? Object.fromEntries(
                        Object.entries(m.formats).map(([ k, f ]) => [ k, f.url.startsWith("http") ? f.url : `${url.origin}${f.url}` ]),
                    )
                    : undefined,
            } )),
            short: p.short,
            skills: ( p.skills ?? [] ).map((s) => s.name),
            slug: p.slug,
            sort_order: p.sort_order ?? 0,
            tags: ( p.tags ?? [] ).map((t) => t.name),
            title: p.title,
            website: p.website ?? undefined,
        } ))
            .sort((a, b) => a.title.localeCompare(b.title, "it"))
    } catch (err) {
        if (err instanceof Error && err.message.startsWith("Strapi")) throw err

        throw new Error(`Strapi irraggiungibile: ${err instanceof Error ? err.message : err}`)
    }
}
