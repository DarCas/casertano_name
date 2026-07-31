/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Query } from 'express-serve-static-core'

export {}

declare global {
    namespace Shared {
        interface Locals extends Dictionary<any> {
        }
    }

    namespace Client {
        interface Locals extends Shared.Locals {
        }

        interface Request<
            P = Record<string | number, string>,
            ResBody = any,
            ReqBody = any,
            ReqQuery = Query,
            Locals extends Dictionary<any> = Dictionary<any>,
        > extends RequestExpress<P, ResBody, ReqBody, ReqQuery, Locals> {
        }

        type Response<
            ResBody = any,
            LocalsObj extends Dictionary<any> = Locals,
            StatusCode extends number = number,
        > = ResponseExpress<any, LocalsObj, StatusCode>
    }
}
