/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { readFileSync, writeFileSync } from 'node:fs'

const { version } = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
)

const swPath = new URL('../out/sw.js', import.meta.url)
const buildId = `${version}-${Math.floor(Date.now() / 1000)}`

writeFileSync(
    swPath,
    readFileSync(swPath, 'utf-8').replace('__BUILD_ID__', buildId)
)
