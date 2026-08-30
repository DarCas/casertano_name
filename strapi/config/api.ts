/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Core } from '@strapi/strapi';

const config = ({env}: Core.Config.Shared.ConfigParams): Core.Config.Api => ( {
    documents: {
        strictParams: true,
        strictRelations: true,
    },
    rest: {
        defaultLimit: 25,
        maxLimit: 100,
        strictParams: true,
        withCount: true,
    },
} )

export default config
