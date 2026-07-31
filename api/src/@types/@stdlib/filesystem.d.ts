/**
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2023-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export {}

declare global {
    function fromDataUrlToFile(base64url: string): {
        buffer: Buffer
        extension: string
    } | null

    type WaitForFileOptions = {
        interval?: number
        retries?: number
        throwOnTimeout?: boolean
    }
}
