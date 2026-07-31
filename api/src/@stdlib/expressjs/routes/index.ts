/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2023-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { captureException } from '@/@stdlib/debug'
import { HttpCodes } from '@/@stdlib/network'
import { AbstractControllerStdlib } from '@/@stdlib/expressjs/controllers/AbstractControllerStdlib'
import { type Request, type Response, Router } from 'express'
import { ValidationError } from 'joi'
import { camelCase } from 'lodash'

export default function factory(routes: Routing, globalMiddlewares?: Middlewares): Router {
    const router = Router()

    for (const path in routes) {
        const route = routes[ path ]

        const {
            actions,
            controller,
            middlewares,
        } = route

        for (const httpMethod in actions) {
            const action: string | ActionCallable = actions[ httpMethod ]

            const _middlewares: Callable[] = []

            if (globalMiddlewares !== undefined &&
                typeof globalMiddlewares === 'function'
            ) {
                _middlewares.push(...globalMiddlewares(route))
            }

            if (middlewares !== undefined) {
                if (middlewares[ path ] !== undefined &&
                    typeof middlewares[ path ] === 'function'
                ) {
                    _middlewares.push(middlewares[ path ])
                }

                if (middlewares[ `${path}|${httpMethod}` ] !== undefined &&
                    typeof middlewares[ `${path}|${httpMethod}` ] === 'function'
                ) {
                    _middlewares.push(middlewares[ `${path}|${httpMethod}` ])
                }
            }

            _middlewares.push(async (req: Request, res: Response) => {
                try {
                    if (typeof action === 'string') {
                        let _action = action

                        if (_action.startsWith(':')) {
                            _action = req.params[ _action.substring(1) ]
                        }

                        _action = camelCase(_action) + 'Action'

                        if (_action in controller) {
                            return await controller[ _action ](req, res)
                        } else {
                            return res.sendStatus(HttpCodes[ 'Not Found' ])
                        }
                    } else if (typeof action === 'function') {
                        return await ( action as ActionCallable )(req, res)
                    } else {
                        return res.sendStatus(HttpCodes[ 'Not Implemented' ])
                    }
                } catch (e) {
                    if (e instanceof ValidationError) {
                        return res.status(HttpCodes[ 'Precondition Failed' ])
                            .json(e.details.map(detail => detail))
                    }

                    await captureException(e)

                    return res.status(HttpCodes[ 'Internal Server Error' ])
                }
            })

            router[ httpMethod ](path, ..._middlewares)
        }
    }

    router.all('*', AbstractControllerStdlib.error404)

    return router
}

// noinspection JSUnusedGlobalSymbols
export enum RouteMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
    HEAD = 'head',
    OPTIONS = 'options',
}
