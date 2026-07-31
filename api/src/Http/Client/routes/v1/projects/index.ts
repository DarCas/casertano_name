/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { StdAction } from "@/@stdlib/expressjs/controllers/AbstractControllerStdlib";
import { RouteMethod } from "@/@stdlib/expressjs/routes";
import { projectsController } from "@/Http/Client/controllers/v1/ProjectsController";

export const projectsRoute = {
    '/projects': {
        actions: {
            [ RouteMethod.GET ]: StdAction.LIST,
        },
        controller: projectsController,
    },
} satisfies Routing
