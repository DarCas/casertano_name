/**
 * @author      Dario Casertano <dario@casertano.name>
 * @copyright   Copyright (c) 2026 Casertano Dario – All rights reserved.
 * @license     Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export {}

declare global {
    interface Dictionary<T> {
        [ index: string ]: T
    }

    interface NumericDictionary<T> {
        [ index: number ]: T
    }

    type Nullable<T> = {
        [P in keyof T]: T[P] | null
    }
}
