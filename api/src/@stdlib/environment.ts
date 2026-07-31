/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2022-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { config } from 'dotenv'
import { existsSync } from 'node:fs'
import { normalize } from 'node:path'

// noinspection JSUnusedGlobalSymbols
export enum EnvEnum {
    beta = 'beta',
    development = 'development',
    production = 'production',
    rc = 'rc',
}

export class Bootstrap {
    private readonly memory = new Map<string, any>()
    private readonly root: string

    private _env: string = '.env'

    private envConfigs = ['.env', '.env.rc', '.env.beta', '.env.local']

    constructor(root: string) {
        this.root = normalize(root)

        this.envConfigs.forEach((env, index) => {
            if (existsSync(`${this.root}/${env}`)) {
                config({
                    debug: true,
                    encoding: 'utf8',
                    override: index > 0,
                    path: env,
                })

                this._env = env
            }
        })
    }

    get description(): string {
        return this.package.description
    }

    get dirname(): string {
        return normalize(this.root)
    }

    get env(): string {
        let env = this._env.split('.')[2] || EnvEnum.production

        if (env === 'local') {
            env = EnvEnum.development
        }

        return env
    }

    get name(): string {
        return this.package.name
    }

    get version(): string {
        return this.package.version
    }

    get<T = any>(key: string, def: T | null = null): T {
        if (this.memory.has(key)) {
            return this.memory.get(key) as T
        }

        return def as T
    }

    has(key: string): boolean {
        return this.memory.has(key)
    }

    set<T = any>(key: string, value: T): void {
        this.memory.set(key, value)
    }

    keys(): string[] {
        return Array.from(this.memory.keys())
    }

    testEnv(env: EnvEnum): boolean {
        return this.env === env
    }

    absPath(path: string): string {
        return normalize(`${this.root}${path}`)
    }

    private get package(): Dictionary<any> {
        return require(`${this.root}/package.json`)
    }
}

export const bootstrap = new Bootstrap(`${__dirname}/../..`)
