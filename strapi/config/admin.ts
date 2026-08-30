/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Core } from '@strapi/strapi';

const config = ({env}: Core.Config.Shared.ConfigParams): Core.Config.Admin => ( {
    apiToken: {
        salt: env('API_TOKEN_SALT')!,
    },
    auth: {
        secret: env('ADMIN_JWT_SECRET')!,
    },
    flags: {
        docLinks: env.bool('FLAG_DOC_LINKS', true),
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    secrets: {
        encryptionKey: env('ENCRYPTION_KEY')!,
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
} )

export default config
