import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join, extname } from "node:path"

const outDir = new URL("../out", import.meta.url).pathname

function findHtmlFiles(dir) {
    const files = []
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) {
            files.push(...findHtmlFiles(full))
        } else if (entry.endsWith(".html")) {
            files.push(full)
        }
    }
    return files
}

const cssRefRe = /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+)"[^>]*>/g

for (const htmlPath of findHtmlFiles(outDir)) {
    const html = readFileSync(htmlPath, "utf-8")
    const replaced = html.replace(cssRefRe, (match, href) => {
        const cssPath = join(outDir, href)
        try {
            const css = readFileSync(cssPath, "utf-8")
            return `<style>${css}</style>`
        } catch {
            return match
        }
    })
    if (replaced !== html) {
        writeFileSync(htmlPath, replaced)
        console.log(`inlined CSS → ${htmlPath.replace(outDir, "/out")}`)
    }
}
