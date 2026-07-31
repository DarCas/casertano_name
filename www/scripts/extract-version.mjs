import { readFileSync, writeFileSync } from "node:fs"

const { version } = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf-8")
)

writeFileSync(
    new URL("../lib/version.ts", import.meta.url),
    `export const siteVersion = "${version}"\n`,
)

console.log(`extracted version → ${version}`)
