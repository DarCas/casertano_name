/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type {
    AbstractControllerStdlib,
} from '@/@stdlib/expressjs/controllers/AbstractControllerStdlib'
import type { RouteMethod } from '@/@stdlib/expressjs/routes'
import type { Query, Request, Response } from 'express-serve-static-core'

export {}

declare global {
    interface JsonResponse<P = undefined> {
        code: number
        pyld: P
        sign: string
        text: string
    }

    interface Paginator<R> {
        paginator: {
            count: number
            maxPage: number

            [ key: string ]: unknown
        }
        recordset: R[]
    }

    interface EventStreamResponse<P = undefined> {
        code: number
        pyld?: P
    }

    type ActionCallable<Req = Request, Res = Response> = (req: Req, res: Res) => Promise<any>
    type Callable<Req = Request, Res = Response> = (req: Req, res: Res, next: NextFunction) => any
    type Middlewares<R = Route> = (route: R) => Callable[]

    interface Route {
        actions: {
            [key in RouteMethod]?: RouteMethod | string | Callable
        }
        controller: AbstractControllerStdlib
        middlewares?: Dictionary<Callable>
    }

    type RequestExpress<
        P = Record<string | number, string>,
        ResBody = any,
        ReqBody = any,
        ReqQuery = Query,
        Locals extends Dictionary<any> = Dictionary<any>,
    > = Request<P, ResBody, ReqBody, ReqQuery, Locals>

    interface ResponseExpress<
        ResBody = any,
        LocalsObj extends Dictionary<any> = Dictionary<any>,
        StatusCode extends number = number,
    > extends Response<ResBody, LocalsObj, StatusCode> {
        toJson<B>(body?: B): Promise<ResponseExpress>
    }

    interface Routing<R = Route> extends Dictionary<R> {
    }
}
