/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import {
    bold,
    green,
    italic,
    magenta,
    red,
    yellowBright,
    blueBright,
} from 'cli-color'
import Table from 'cli-table'

/**
 * CliUx is an abstract utility class designed to provide consistent formatting
 * for command-line interface (CLI) output. It offers methods to format text with
 * colors, styles, and special markers that represent CLI UI elements like corners,
 * lines, and subcommands.
 */
export abstract class CliUx {
    /**
     * Represents the end corner character (└) used in CLI UI layouts.
     */
    static readonly cornerEnd = '└'

    /**
     * Represents the middle corner character (├) used in CLI UI layouts.
     */
    static readonly cornerMiddle = '├'

    /**
     * Represents the start corner character (┌) used in CLI UI layouts.
     */
    static readonly cornerStart = '┌'

    /**
     * Represents the dot character (·) used in CLI UI layouts.
     */
    static readonly dot = '·'

    /**
     * Represents the horizontal line character (─) used in CLI UI layouts.
     */
    static readonly middleLine = '─'

    /**
     * Combines cornerMiddle and middleLine to create a subcommand prefix (├─).
     */
    static readonly subCommand = `${CliUx.cornerMiddle}${CliUx.middleLine}`

    /**
     * Combines cornerEnd and middleLine to create the latest subcommand prefix (└─).
     */
    static readonly latestSubCommand = `${CliUx.cornerEnd}${CliUx.middleLine}`

    /**
     * Formats text to represent a command in CLI output.
     *
     * @param text - The text to format as a command.
     * @returns The formatted text in green color.
     * @description Applies a style to the input text, making it visually distinct as a command
     * in CLI output.
     */
    static command(text: string): string {
        return green(CliUx.plain(text))
    }

    /**
     * Formats text to represent a description in CLI output.
     *
     * @param text - The text to format as a description.
     * @returns The formatted text in italic magenta.
     * @description Applies a style to the input text, making it suitable for descriptions
     * or additional information in CLI output.
     */
    static describe(text: string): string {
        return italic(magenta(CliUx.plain(text)))
    }

    /**
     * Formats text to represent a migration command in CLI output.
     *
     * @param text - The text to format as a migration command.
     * @returns The formatted text in blueBright.
     * @description Applies a style to the input text, making it visually distinct
     * as a migration-related command in CLI output.
     */
    static migration(text: string): string {
        return blueBright(CliUx.plain(text))
    }

    /**
     * Formats text to represent a one-time (una tantum) migration command in CLI output.
     *
     * Appends "(una tantum)" to the input and delegates to {@link migration}
     * for styling.
     *
     * @param text - The text to format as a one-time migration command.
     * @returns The formatted text with "(una tantum)" appended, in italic blueBright.
     */
    static migrationUnatantum(text: string): string {
        return CliUx.migration(`${text} (una tantum)`)
    }

    /**
     * Processes and returns text with special markers replaced.
     *
     * @param text - The text containing markers (%ce%, %cm%, etc.) to replace.
     * @returns The text with markers resolved to CLI UI characters.
     */
    static plain(text: string): string {
        return CliUx.replacer(text)
    }

    /**
     * Formats text to represent a service name in CLI output.
     *
     * @param text - The text to format as a service name.
     * @returns The formatted text
     * @description Applies a style text to the input, making it stand out as a
     * service identifier in CLI output.
     */
    static service(text: string): string {
        return bold(red(CliUx.plain(text)))
    }

    /**
     * Creates a styled CLI table with Unicode border characters.
     *
     * Uses double-line outer borders (╔═╗╚═╝) and single-line inner
     * separators (│─┼) for a clean terminal appearance.
     *
     * @param head - Optional array of column header strings.
     * @param options - Additional cli-table options to merge.
     * @returns A configured Table instance ready for population.
     */
    static table(head?: string[], options?: Dictionary<any>): Table {
        return new Table({
            chars: {
                top: '═',
                'top-mid': '╤',
                'top-left': '╔',
                'top-right': '╗',
                bottom: '═',
                'bottom-mid': '╧',
                'bottom-left': '╚',
                'bottom-right': '╝',
                left: '║',
                'left-mid': '╟',
                mid: '─',
                'mid-mid': '┼',
                right: '║',
                'right-mid': '╢',
                middle: '│',
            },
            head,
            ...options,
        })
    }

    /**
     * Formats text to represent a test command in CLI output.
     *
     * Appends "(for debug purposes only)" and applies italic yellow styling
     * to distinguish test-only commands from production commands.
     *
     * @param text - The text to format as a test command.
     * @returns The formatted text with italic yellow styling.
     */
    static testCommand(text: string): string {
        return italic(yellowBright(CliUx.plain(`${text} (for debug purposes only)`)))
    }

    /**
     * Formats text to represent a tool command in CLI output.
     *
     * @param text - The text to format as a tool command.
     * @returns The formatted text in italic magentaBright.
     */
    static toolCommand(text: string): string {
        return magenta(CliUx.plain(text))
    }

    /**
     * Internal method that processes special markers in text.
     *
     * @param text - The text containing special markers to replace.
     * @returns The text with all special markers replaced by their corresponding
     * characters.
     * @description Processes special markers in the text and replaces them with
     * their corresponding characters. The markers include:
     * - %ce% - cornerEnd character
     * - %cm% - cornerMiddle character
     * - %cs% - cornerStart character
     * - %dot% - dot character
     * - %ml% - middleLine character
     * - %sc% - subCommand prefix
     * - %lsc% - latestSubCommand prefix
     * Also replaces multiple whitespace characters with non-breaking spaces.
     */
    protected static replacer(text: string): string {
        text = text.replace(new RegExp('%ce%', 'g'), CliUx.cornerEnd)
        text = text.replace(new RegExp('%cm%', 'g'), CliUx.cornerMiddle)
        text = text.replace(new RegExp('%cs%', 'g'), CliUx.cornerStart)
        text = text.replace(new RegExp('%dot%', 'g'), CliUx.dot)
        text = text.replace(new RegExp('%ml%', 'g'), CliUx.middleLine)

        text = text.replace(new RegExp('%sc%', 'g'), CliUx.subCommand)
        text = text.replace(new RegExp('%lsc%', 'g'), CliUx.latestSubCommand)

        text = text.replace(/\s+/g, '\u00A0')

        return text
    }
}
