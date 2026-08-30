/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Core } from '@strapi/strapi';

const config = ({env}: Core.Config.Shared.ConfigParams): Core.Config.Server => ( {
    app: {
        keys: env.array('APP_KEYS')!,
    },
    host: env('HOST', '0.0.0.0'),
    mcp: {
        enabled: true,
    },
    port: env.int('PORT', 1337),
    webhooks: {
        populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
} )

export default config
