/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import factory from '@/@stdlib/expressjs/routes'
import { contactsRoute } from "@/Http/Client/routes/v1/contacts";
import { projectsRoute } from "@/Http/Client/routes/v1/projects";

export const v1 = factory(
    {
        ...contactsRoute,
        ...projectsRoute,
    }
)
