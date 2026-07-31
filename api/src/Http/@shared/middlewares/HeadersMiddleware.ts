/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { bootstrap } from "@/@stdlib/environment";
import { NextFunction, Request, Response } from 'express';

export function headersMiddleware() {
    return (_: Request, res: Response, next: NextFunction) => {
        res.setHeader('x-api-version', bootstrap.version)

        next()
    }
}
