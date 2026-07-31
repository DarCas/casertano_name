/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2023-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import Joi, { type CustomValidator } from 'joi'
import { reduce } from 'lodash'

export const JoiStripTagsValidator: CustomValidator<string | null> = value => {
    if (!value) {
        return null
    }

    value = value.replace(/<\/?[^>]+(>|$)/g, '').trim()

    return value.length === 0 ? null : value
}

export function JoiValidate<TSchema>(
    objectSchema: Joi.ObjectSchema<TSchema>,
    value: any,
): Promise<TSchema> {
    return new Promise((resolve, reject) => {
        const { error, value: form } = objectSchema.validate(value, {
            abortEarly: false,
            errors: {
                wrap: {
                    label: false,
                },
            },
        })

        if (!error) {
            resolve(form)
        } else {
            const reasons = reduce(
                error.details,
                (carry, detail) => {
                    carry[detail.context?.key || 'global'] = detail.message

                    return carry
                },
                {} as JoiError,
            )

            reject(reasons)
        }
    })
}

export const joi = Joi.defaults(schema => {
    if (schema.type === 'string') {
        return schema.messages({
            'string.alphanum': 'Il parametro {{#label}} deve contenere solo caratteri alfanumerici',
            'string.base': 'Il parametro {{#label}} deve essere una stringa',
            'string.base64': 'Il parametro {{#label}} deve essere una stringa base64 valida',
            'string.creditCard': 'Il parametro {{#label}} deve essere una carta di credito',
            'string.dataUri': 'Il parametro {{#label}} deve essere una stringa dataUri valida',
            'string.domain': 'Il parametro {{#label}} deve contenere un nome di dominio valido',
            'string.email': "Il parametro {{#label}} deve essere un'email valida",
            'string.empty': 'Il parametro {{#label}} non può essere vuoto',
            'string.guid': 'Il parametro {{#label}} deve essere un GUID valido',
            'string.hex': 'Il parametro {{#label}} deve contenere solo caratteri esadecimali',
            'string.hexAlign':
                'La rappresentazione decodificata esadecimale di {{#label}} deve essere allineata ai byte',
            'string.hostname': 'Il parametro {{#label}} deve essere un hostname valido',
            'string.ip':
                'Il parametro {{#label}} deve essere un indirizzo IP valido con un CIDR di {{#cidr}}',
            'string.ipVersion':
                'Il parametro {{#label}} deve essere un indirizzo IP valido di una delle seguenti versioni {{#version}} con un CIDR di {{#cidr}}',
            'string.isoDate': 'Il parametro {{#label}} deve essere una data nel formato ISO',
            'string.isoDuration': 'Il parametro {{#label}} deve essere una durata ISO 8601 valida',
            'string.length': 'La lunghezza di {{#label}} deve essere di {{#limit}} caratteri',
            'string.lowercase': 'Il parametro {{#label}} deve contenere solo caratteri minuscoli',
            'string.max':
                'La lunghezza di {{#label}} deve essere inferiore o uguale a {{#limit}} caratteri',
            'string.min': 'La lunghezza di {{#label}} deve essere di almeno {{#limit}} caratteri',
            'string.normalize':
                'Il parametro {{#label}} deve essere normalizzato in unicode nella forma {{#form}}',
            'string.pattern.base':
                'Il parametro {{#label}} con valore {:[.]} non riesce a corrispondere al pattern richiesto: {{#regex}}',
            'string.pattern.invert.base':
                'Il parametro {{#label}} con valore {:[.]} corrisponde al pattern invertito: {{#regex}}',
            'string.pattern.invert.name':
                'Il parametro {{#label}} con valore {:[.]} corrisponde al pattern invertito {{#name}}',
            'string.pattern.name':
                '{{#label}} con valore {:[.]} non riesce a corrispondere al pattern {{#name}}',
            'string.token':
                'Il parametro {{#label}} deve contenere solo caratteri alfanumerici e underscore',
            'string.trim': 'Il parametro {{#label}} non deve avere spazi vuoti iniziali o finali',
            'string.uppercase': 'Il parametro {{#label}} deve contenere solo caratteri maiuscoli',
            'string.uri': 'Il parametro {{#label}} deve essere un URI valido',
            'string.uriCustomScheme':
                'Il parametro {{#label}} deve essere un URI valido con uno schema corrispondente al pattern {{#scheme}}',
            'string.uriRelativeOnly': 'Il parametro {{#label}} deve essere un URI relativo valido',
        })
    }

    return schema
})
