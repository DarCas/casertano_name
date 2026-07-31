/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { HttpCodes } from '@/@stdlib/network'

// noinspection JSUnusedGlobalSymbols
export abstract class AbstractControllerStdlib {
    changeAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    createAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    deleteAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    listAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    singleAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    updateAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    upsertAction(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Implemented'])
    }

    static error404(_: RequestExpress, res: ResponseExpress): any {
        res.sendStatus(HttpCodes['Not Found'])
    }
}

export enum StdAction {
    CHANGE = 'change',
    CREATE = 'create',
    DELETE = 'delete',
    LIST = 'list',
    SINGLE = 'single',
    UPDATE = 'update',
    UPSERT = 'upsert',
}
