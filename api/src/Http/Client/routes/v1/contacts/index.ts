/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { StdAction } from "@/@stdlib/expressjs/controllers/AbstractControllerStdlib";
import { RouteMethod } from "@/@stdlib/expressjs/routes";
import { contactsController } from "@/Http/Client/controllers/v1/ContactsController";
import rateLimit from "express-rate-limit";

export const contactsRoute = {
    '/contacts': {
        actions: {
            [ RouteMethod.POST ]: StdAction.CREATE,
        },
        controller: contactsController,
        middlewares: {
            [ `/contacts|${RouteMethod.POST}` ]: rateLimit({
                legacyHeaders: false,
                max: 5,
                message: {
                    error: "Troppe richieste. Riprova tra qualche minuto.",
                },
                standardHeaders: true,
                windowMs: 15 * 60 * 1000,
            }),
        },
    },
} satisfies Routing
