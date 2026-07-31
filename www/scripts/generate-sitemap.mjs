/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { writeFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const BASE = "https://casertano.name"
const TODAY = new Date().toISOString().slice(0, 10)
const outDir = join(import.meta.dirname, "..", "out")

let projectSlugs = []
try {
    projectSlugs = readdirSync(join(outDir, "progetti"), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
} catch {}

const pages = [
    { loc: "/", changefreq: "monthly", priority: "1.0" },
    ...projectSlugs.map((slug) => ({
        loc: `/progetti/${slug}/`,
        changefreq: "monthly",
        priority: "0.8",
    })),
]

const urls = pages.map(
    p => `  <url>
    <loc>${BASE}${p.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
)
    .join("\n")

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(join(outDir, "sitemap.xml"), sitemap)
console.log(`sitemap.xml generated (${pages.length} URL)`)
