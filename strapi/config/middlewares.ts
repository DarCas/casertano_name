/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        config: {
            headers: '*',
        },
        name: 'strapi::cors',
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]

export default config
