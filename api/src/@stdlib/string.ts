/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { reduce } from 'lodash';

export function templating<R extends Dictionary<string>>(template: string, replacements: R): string {
    return reduce(replacements, (template, replacement, key) => {
        return template.replace(new RegExp('{{' + key + '}}', 'g'), replacement)
    }, template)
}
