/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2023-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { CaptureContext, Event, EventHint } from '@sentry/core'
import {
    type SeverityLevel,
    captureEvent as _captureEvent,
    captureException as _captureException,
    captureMessage as _captureMessage,
    flush as _flush,
    isEnabled,
} from '@sentry/node'
import { cyan } from 'cli-color'
import { exit, hrtime, memoryUsage } from 'node:process'

const flush = () => _flush(1_500)

export async function captureException<T = unknown>(
    exception: T,
    extra?: Dictionary<unknown>,
): Promise<T> {
    if (isEnabled()) {
        _captureException(exception, { extra })
        await flush()
    }

    if (extra) {
        console.dir({ exception, extra }, { depth: null })
    } else {
        console.dir(exception, { depth: null })
    }

    return exception
}

// noinspection JSUnusedGlobalSymbols
export async function captureMessage(
    message: string,
    captureContext?: CaptureContext | SeverityLevel,
): Promise<void> {
    _captureMessage(message, captureContext)
    await flush()
}

// noinspection JSUnusedGlobalSymbols
export async function captureEvent(event: Event, hint?: EventHint): Promise<void> {
    _captureEvent(event, hint)
    await flush()
}

/**
 * Crea una funzione di benchmark per misurare il tempo di esecuzione e l'uso della memoria heap di un blocco di codice.
 *
 * @returns {(_exit?: 0 | 1) => void} Una funzione di stop che, quando invocata:
 *  - Calcola il tempo trascorso dall'invocazione di `benchmark()` (in secondi e millisecondi)
 *  - Calcola la memoria heap utilizzata dal processo Node.js (approssimata in MiB)
 *  - Stampa le informazioni formattate in console con colori
 *
 * @example
 * ```ts
 * const stop: () => void = benchmark()
 *
 * // Codice da misurare
 * doHeavyWork()
 *
 * // Termina il benchmark e stampa i risultati
 * stop()
 * ```
 *
 * @see {@link https://nodejs.org/api/process.html#processhrtime} per `process.hrtime`
 * @see {@link https://nodejs.org/api/process.html#processmemoryusage} per `process.memoryUsage`
 */
export function benchmark(): (_exit?: 0 | 1) => void {
    const hrstart: ReturnType<typeof hrtime> = hrtime()

    return function (_exit): void {
        const heapUsed = memoryUsage().heapUsed / 1024 / 1024
        const hrend: ReturnType<typeof hrtime> = hrtime(hrstart)

        console.log('')
        console.log('')
        console.log('--- --- --- --- --- --- --- --- --- --- ---')
        console.log(`--- Execution time: ${cyan('%ds %dms')}`, hrend[0], hrend[1] / 1_000_000)
        console.log(`--- The script uses approximately ${cyan(`${Math.round(heapUsed)} MiB`)}`)
        console.log('--- --- --- --- --- --- --- --- --- --- ---')

        if (_exit !== undefined) {
            exit(_exit)
        }
    }
}
