/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import rateLimit from "express-rate-limit"
import cors from "cors"
import { createTransport } from "nodemailer"
import { literal, object, string } from "zod"
import { env } from "node:process"
import { contactEmailHtml } from "./templates/contact-email.js"

async function verifyTurnstile(token: string): Promise<boolean> {
    if (!env.TURNSTILE_SECRET_KEY) {
        return true
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY,
            response: token,
        }),
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        method: "POST",
    })

    const data = await res.json() as { success: boolean }
    return data.success
}

const app = express()

app.use(cors({
    allowedHeaders: ["Content-Type"],
    methods: ["POST"],
    origin: ( env.CORS_ORIGIN ?? "http://localhost:3000" ).split(","),
}))
app.use(express.json())

const ContactSchema = object({
    'cf-turnstile-response': string()
        .min(1, "Captcha non valido"),
    consent: literal("on", {
        errorMap: () => ( {message: "Devi accettare la privacy policy"} ),
    }),
    email: string()
        .email("E-Mail non valida"),
    message: string()
        .min(1, "Il messaggio è obbligatorio")
        .max(5000),
    name: string()
        .min(1, "Il nome è obbligatorio")
        .max(100),
})

const smtp = createTransport({
    auth: env.SMTP_USER
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS || "",
        }
        : undefined,
    host: env.SMTP_HOST || "localhost",
    port: Number(env.SMTP_PORT) || 587,
    secure: env.SMTP_SECURE === "true",
})

const __dirname = dirname(fileURLToPath(import.meta.url))

const projects = JSON.parse(
    readFileSync(join(__dirname, "projects.json"), "utf-8"),
) as Array<{
    slug: string
    title: string
    short: string
    tags: string[]
    description: string
    features: string[]
    skills: string[]
    media?: Array<{ type: "image" | "video"; src: string; alt?: string }>
}>

const toEmail = env.NEXT_PUBLIC_CONTACT_EMAIL

const contactLimiter = rateLimit({
    legacyHeaders: false,
    max: 5,
    message: {error: "Troppe richieste. Riprova tra qualche minuto."},
    standardHeaders: true,
    windowMs: 15 * 60 * 1000,
})

app.get("/api/projects", (_req, res) => {
    res.json(projects)
})

app.post("/api/contact", contactLimiter, async (req, res) => {
    if (!toEmail) {
        res.status(500)
            .json({error: "Contatti non configurati"})
        return
    }

    const parsed = ContactSchema.safeParse(req.body)

    if (!parsed.success) {
        res.status(400)
            .json({
                error: parsed.error.errors[ 0 ].message,
            })

        return
    }

    const {
        name,
        email,
        message,
        "cf-turnstile-response": turnstileToken,
    } = parsed.data

    const valid = await verifyTurnstile(turnstileToken)

    if (!valid) {
        res.status(400)
            .json({error: "Captcha non valido"})

        return
    }

    const text = [
        `Nome: ${name}`,
        `E-Mail: ${email}`,
        '',
        message,
    ].join("\n")

    try {
        await smtp.sendMail({
            from: {
                address: email,
                name,
            },
            replyTo: {
                address: email,
                name,
            },
            subject: `Richiesta da casertano.name — ${name}`,
            text,
            html: contactEmailHtml(name, email, message),
            to: toEmail,
        })

        res.json({success: true})
    } catch {
        res.status(500)
            .json({error: "Errore nell'invio dell'e-mail. Riprova più tardi."})
    }
})

const port = Number(env.PORT) || 3001
app.listen(port, () => {
    console.log(`api in ascolto su :${port}`)
})
