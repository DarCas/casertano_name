/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { captureException } from '@/@stdlib/debug'
import { HttpCodes, HttpError } from '@/@stdlib/network'
import { isEmptysh } from '@/@stdlib/object'
import { NextFunction } from 'express'

export function jsonServices() {
    return (_: RequestExpress, res: ResponseExpress, next: NextFunction) => {
        res.toJson = async <B = any>(body?: B) => {
            try {
                const code = res.statusCode as HttpCodes

                let payload: JsonResponse<any>

                if (isEmptysh(body)) {
                    payload = {
                        code,
                        text: HttpError(code),
                    } as JsonResponse<any>
                } else {
                    payload = {
                        code,
                        pyld: body,
                        text: HttpError(code),
                    } as JsonResponse<any>
                }

                return res.json(payload)
            } catch (e) {
                await captureException(e)
            }

            return res.status(HttpCodes.Gone).json({
                code: HttpCodes.Gone,
                text: HttpError(HttpCodes.Gone),
            })
        }

        return next()
    }
}
