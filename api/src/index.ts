/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { initSentry } from '@/@stdlib/sentry'
import { argv } from 'node:process'
import { bootstrap } from '@/@stdlib/environment'
import { Settings } from 'luxon'
import { basename } from 'node:path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { blackBright, blueBright, yellowBright } from 'cli-color'

;(async function () {
    console.clear()

    initSentry()

    Settings.defaultZone = 'Europe/Rome'
    Settings.defaultLocale = 'it-IT'

    const _yargs = yargs(hideBin(argv))

    _yargs.version(blueBright(`${bootstrap.description} ${bootstrap.version} (🛡️  ${bootstrap.env})`))
        .alias('V', 'version')
        .scriptName(blackBright(basename(__filename)))
        .usage(yellowBright('Usage: $0 <command> [options]'))
        .help()
        .alias('h', 'help')
        .epilog(
            blueBright(
                `${bootstrap.description} © ${new Date().getFullYear()} Dario Casertano`,
            ),
        )

        .command(require('./Http'))

        .demandCommand(1)
        .strictCommands()
        .wrap(_yargs.terminalWidth())
        .parse()
})()
