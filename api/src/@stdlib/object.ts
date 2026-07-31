/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { isEmpty, isNull, isPlainObject, isUndefined, reduce, sortBy, trim } from 'lodash'

export function deepClone<T>(obj: T): T {
    if (!obj) {
        return obj
    }

    return JsonSafeParse<T>(JSON.stringify(obj))!
}

export const ksort = <T>(obj: T, recursive = false): T => {
    if (!obj) {
        return obj
    }

    return reduce(
        sortBy(Object.keys(obj)),
        (carry, key) => {
            // @ts-ignore
            const value = obj[key]

            // @ts-ignore
            carry[key] = recursive && isPlainObject(value) ? ksort(value, true) : value

            return carry
        },
        {} as T,
    )
}

export function JsonSafeParse<T>(value?: string | null): T | undefined {
    if (!value) {
        return undefined
    }

    return JSON.parse(value) as T
}

export function isEmptysh(value?: any): boolean {
    if (isUndefined(value) || isNull(value)) {
        return true
    }

    if (typeof value === 'object') {
        return isEmpty(value)
    }

    if (typeof value === 'number') {
        return false
    }

    if (typeof value === 'string') {
        return trim(value) === ''
    }

    return false
}
