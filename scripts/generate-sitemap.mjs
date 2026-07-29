/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import {writeFileSync} from "node:fs"
import {join} from "node:path"

const BASE = "https://casertano.name"
const TODAY = new Date().toISOString().slice(0, 10)

const pages = [
    {loc: "/", changefreq: "monthly", priority: "1.0"},
    {loc: "/privacy-policy/", changefreq: "yearly", priority: "0.5"},
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

const outDir = join(import.meta.dirname, "..", "out")
writeFileSync(join(outDir, "sitemap.xml"), sitemap)
console.log("sitemap.xml generated")
