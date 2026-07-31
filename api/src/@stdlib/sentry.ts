/**
 * @author      Dario Casertano <dario@casertano.name>
 * @copyright   Copyright (c) 2025-2026 Casertano Dario – All rights reserved.
 * @license     Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { bootstrap, EnvEnum } from '@/@stdlib/environment'
import { init, isEnabled } from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { filter, includes } from 'lodash'
import { env } from 'node:process'

export function initSentry(): void {
    if (env.GLITCHTIP_DSN && env.RELEASESTAGE && !isEnabled()) {
        init({
            debug: !bootstrap.testEnv(EnvEnum.production),
            dsn: env.GLITCHTIP_DSN,
            enableLogs: true,
            enabled: bootstrap.testEnv(EnvEnum.production),
            environment: env.RELEASESTAGE,
            integrations(integrations) {
                integrations = filter(
                    integrations,
                    integration =>
                        !includes(
                            [
                                'Anthropic_AI',
                                'Fastify',
                                'Google_GenAI',
                                'Kafka',
                                'OpenAI',
                                'VercelAI',
                            ],
                            integration.name,
                        ),
                )

                integrations.push(nodeProfilingIntegration())

                return integrations
            },
            release: bootstrap.version,
            sampleRate: 1,
            sendDefaultPii: true,
            tracesSampleRate: bootstrap.testEnv(EnvEnum.production) ? 0.1 : 1,
        })
    }
}

export { isEnabled } from '@sentry/node'
