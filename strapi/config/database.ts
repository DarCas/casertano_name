/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Core } from '@strapi/strapi';

const config = ({env}: Core.Config.Shared.ConfigParams): Core.Config.Database => ( {
    connection: {
        acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        client: 'sqlite',
        connection: {
            filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        useNullAsDefault: true,
    },
} )

export default config
