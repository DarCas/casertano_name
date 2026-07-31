/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
    allowedHeaders: [
        'Accept',
        'Authorization',
        'Cache-Control',
        'Content-Type',
        'Origin',
    ],
    credentials: false,
    exposedHeaders: [
        'x-api-version',
    ],
    methods: [
        'GET',
        'HEAD',
        'POST',
        'OPTIONS',
    ],
    origin: [
        'https://casertano.name',
        'https://www.casertano.name',
        'https://darcas.app',
        'https://www.darcas.app',
    ],
}
