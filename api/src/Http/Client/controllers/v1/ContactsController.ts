/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { getStorageTemplates } from "@/@projlib/Storage";
import { captureException } from "@/@stdlib/debug";
import { JoiValidate } from "@/@stdlib/joi";
import { HttpCodes } from "@/@stdlib/network";
import { templating } from "@/@stdlib/string";
import { AbstractClientController } from "@/Http/Client/controllers/AbstractClientController";
import { createForm } from "@/Http/Client/validations/ContactsValidation";
import { readFileSync } from "node:fs";
import { env } from "node:process";
import { createTransport } from "nodemailer";

class ContactsController extends AbstractClientController {
    private readonly mailTransporter: any
    private readonly recipient: string
    private readonly templateContacts: string

    constructor() {
        super()

        this.mailTransporter = createTransport({
            auth: {
                pass: env.SMTP_PASS,
                user: env.SMTP_USER,
            },
            host: env.SMTP_HOST,
            port: Number(env.SMTP_PORT),
            secure: env.SMTP_SECURE === "true",
        })

        this.recipient = env.NEXT_PUBLIC_CONTACT_EMAIL

        this.templateContacts = readFileSync(getStorageTemplates('/form/contacts/default.html'), 'utf8')
    }

    async createAction(req: Client.Request, res: Client.Response) {
        try {
            const form = await JoiValidate(createForm, req.body)

            try {
                const valid = await this.verifyTurnstile(form[ "cf-turnstile-response" ])

                if (!valid) {
                    return res.sendStatus(HttpCodes[ "Invalid Token" ])
                }

                await this.mailTransporter.sendMail({
                    from: {
                        address: form.email,
                        name: form.name,
                    },
                    html: templating<{
                        email: string
                        message: string
                        name: string
                    }>(this.templateContacts, {
                        email: form.email,
                        message: form.message,
                        name: form.name,
                    }),
                    replyTo: {
                        address: form.email,
                        name: form.name,
                    },
                    subject: `Richiesta da casertano.name — ${form.name}`,
                    text: [
                        `Nome: ${form.name}`,
                        `E-Mail: ${form.email}`,
                        "",
                        form.message,
                    ].join("\n"),
                    to: this.recipient,
                })

                return res.sendStatus(HttpCodes.OK)
            } catch (e) {
                await captureException(e, {form})

                return res.status(HttpCodes[ "Internal Server Error" ])
            }
        } catch (e) {
            return res.status(HttpCodes[ "Precondition Failed" ])
                .toJson(e)
        }
    }

    private async verifyTurnstile(token: string): Promise<boolean> {
        if (!env.TURNSTILE_SECRET_KEY) {
            return true
        }

        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            body: new URLSearchParams({
                secret: env.TURNSTILE_SECRET_KEY,
                response: token,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })

        const data = await res.json() as { success: boolean }

        return data.success
    }
}

export const contactsController = new ContactsController()
