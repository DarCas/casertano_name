/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
    'image/*',
    'video/*',
]

const deniedTypes = [
    'image/svg+xml',
    'application/vnd.microsoft.portable-executable',
    'application/x-msdownload',
    'application/x-msdos-program',
    'application/x-executable',
    'application/x-dosexec',
    'application/x-sh',
    'text/x-shellscript',
    'application/x-mach-binary',
]

const config = ({env}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ( {
    upload: {
        config: {
            provider: 'local',
            sizeLimit: 10485760,
            security: {
                allowedTypes: allowedMediaTypes,
                deniedTypes,
            },
        },
    },
    'users-permissions': {
        config: {
            jwtManagement: 'refresh',
            sessions: {
                httpOnly: true,
            },
        },
    },
} )

export default config
