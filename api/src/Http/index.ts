/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { getStorageProjects, getStorageWww } from "@/@projlib/Storage";
import { CliUx } from '@/@stdlib/cli-ux'
import { bootstrap, EnvEnum } from '@/@stdlib/environment'
import { jsonServices } from '@/@stdlib/expressjs/services/JsonServices'
import { headersMiddleware } from "@/Http/@shared/middlewares/HeadersMiddleware";
import { corsOptions as corsOptionsClient } from '@/Http/Client/cors'
import { v1 } from '@/Http/Client/routes/v1'
import { blueBright, cyan, yellowBright } from 'cli-color'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { Argv } from 'yargs'

export const command = 'api'
export const describe = CliUx.service('%dot% API service')

export const builder = (argv: Argv) => {
    return argv.usage(cyan('Usage: $0 api [--port <number>]')).option('port', {
        default: 3001,
        description: CliUx.describe('Listening port'),
        type: 'number',
    })
}

export const handler = async ({port}: { port: number }): Promise<void> => {
    const app = express()

    if (bootstrap.testEnv(EnvEnum.development)) {
        corsOptionsClient.origin = '*'
    }

    app.disable('x-powered-by')
    app.disable('etag')

    app.set('trust proxy', 1)

    app.use(compression())
    app.use(express.json({limit: '5mb'}))
    app.use(express.urlencoded({
        extended: true,
        limit: '5mb',
    }))
    app.use(express.static(getStorageWww(), {
        etag: true,
        immutable: true,
        index: "index.html",
        maxAge: "1y",
    }))

    app.use(headersMiddleware())
    app.use(jsonServices())

    app.use('/api/v1', cors(corsOptionsClient), v1)
    app.use("/images/projects", express.static(getStorageProjects()))

    app.use((req, res, next) => {
        if (req.path.startsWith("/api/")) {
            return next()
        }

        return res.status(404)
            .sendFile(getStorageWww('/404.html'), err => {
                if (err) {
                    res.sendStatus(404)
                }
            })
    })

    app.listen(port, '0.0.0.0', () => {
        console.log(blueBright(`${bootstrap.description} ${yellowBright(bootstrap.version)} is listening on port ${yellowBright(port)}`), {
            corsOptionsClient,
            env: bootstrap.env,
        })
    })
}
