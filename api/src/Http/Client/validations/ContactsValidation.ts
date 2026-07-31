/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { joi, JoiStripTagsValidator } from "@/@stdlib/joi";

interface CreateForm {
    'cf-turnstile-response': string
    consent: "on"
    email: string
    message: string
    name: string
}

export const createForm = joi.object<CreateForm>({
    'cf-turnstile-response': joi.string()
        .min(1),
    consent: joi.string()
        .valid('on')
        .label('Consenso'),
    email: joi.string()
        .email()
        .label('E-mail'),
    message: joi.string()
        .custom(JoiStripTagsValidator)
        .max(255)
        .label('Messaggio'),
    name: joi.string()
        .trim()
        .min(3)
        .label('Nome'),
})
