/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2023-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import {
    existsSync,
    mkdirSync,
    writeFileSync,
} from 'node:fs'
import { extname as _extname } from 'node:path'

export function extname(path: string, noDot: boolean = true): string {
    const ext = _extname(path)

    if (noDot) {
        return ext.substring(1)
    }

    return ext
}

export function mkdir(dirPath: string, gitignore?: boolean): string {
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true })

        if (gitignore) {
            writeFileSync(`${dirPath}/.gitignore`, '*', 'utf-8')
        }
    } else if (gitignore && !existsSync(`${dirPath}/.gitignore`)) {
        writeFileSync(`${dirPath}/.gitignore`, '*', 'utf-8')
    }

    return dirPath
}
