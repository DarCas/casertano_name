/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { ok } from "node:assert";
import { createHash } from "node:crypto";

export function sha1(digest: string | NodeJS.ArrayBufferView): string {
    const hash = createHash('sha1')
    hash.update(digest)

    return hash.digest('hex')
}

export function sha256(digest: string | NodeJS.ArrayBufferView): string {
    const hash = createHash('sha256')
    hash.update(digest)

    return hash.digest('hex')
}

export function ETag(digest: string | NodeJS.ArrayBufferView, weak?: boolean): string {
    ok(digest !== undefined, "sha256 «digest» undefined")

    const hash = createHash('sha256')
    hash.update(digest)

    if (weak) {
        return `W/"${hash.digest('base64')}"`
    }

    return hash.digest('base64')
}
