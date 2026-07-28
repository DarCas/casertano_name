/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import express from "express"
import rateLimit from "express-rate-limit"
import cors, { CorsOptions } from "cors"
import { readdirSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { env } from "node:process"
import { fileURLToPath } from "node:url"
import { createTransport } from "nodemailer"
import { literal, object, string } from "zod"
import { projects } from "./projects.js";
import { contactEmailHtml } from "./templates/contact-email.js";

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

const __dirname = dirname(fileURLToPath(import.meta.url))
const storageDir = resolve(__dirname, "..", "@storage")
const imagesDir = join(storageDir, "images", "projects")

const IMAGE_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg"])
const VIDEO_EXTS = new Set([".mp4"])

function listProjectMedia(slug: string): Array<{
    src: string
    type: "image" | "video"
}> {
    try {
        const files = readdirSync(imagesDir)
        const media: Array<{ type: "image" | "video"; src: string; alt?: string }> = []

        for (const file of files) {
            if (!file.startsWith(slug + ".")) continue
            const ext = file.slice(file.lastIndexOf(".")).toLowerCase()

            const fullPath = join(imagesDir, file)
            const mtime = statSync(fullPath).mtimeMs.toFixed(0)
            const src = `/images/projects/${file}?${mtime}`

            if (IMAGE_EXTS.has(ext)) {
                media.push({src, type: "image"})
            } else if (VIDEO_EXTS.has(ext)) {
                media.push({src, type: "video"})
            }
        }

        return media
    } catch {
        return []
    }
}

const outDir = resolve(__dirname, "..", "out")

const corsOptions = {
    allowedHeaders: ["Content-Type"],
    methods: ["POST"],
    origin: ( env.CORS_ORIGIN ?? '' )
        .split(",")
        .map(o => o.trim().toLowerCase()),
} satisfies CorsOptions

const app = express()

app.set("trust proxy", 1)

app.use(cors(corsOptions))
app.use(express.json())

app.use("/images/projects", express.static(imagesDir))

const ContactSchema = object({
    "cf-turnstile-response": string().min(1, "Captcha non valido"),
    consent: literal("on", {errorMap: () => ( {message: "Devi accettare la privacy policy"} )}),
    email: string().email("E-Mail non valida"),
    message: string().min(1, "Il messaggio è obbligatorio").max(5000),
    name: string().min(1, "Il nome è obbligatorio").max(100),
})

const smtp = createTransport({
    auth: env.SMTP_USER
        ? {user: env.SMTP_USER, pass: env.SMTP_PASS || ""}
        : undefined,
    host: env.SMTP_HOST || "localhost",
    port: Number(env.SMTP_PORT) || 587,
    secure: env.SMTP_SECURE === "true",
})

const toEmail = env.NEXT_PUBLIC_CONTACT_EMAIL

const contactLimiter = rateLimit({
    legacyHeaders: false,
    max: 5,
    message: {
        error: "Troppe richieste. Riprova tra qualche minuto.",
    },
    standardHeaders: true,
    windowMs: 15 * 60 * 1000,
})

app.get("/api/projects", (_, res) => {
    res.json(projects.map(p => ( {
        ...p,
        media: ( p.media?.length ? p.media : listProjectMedia(p.slug) )
            .map(m => m),
    } )))
})

app.post("/api/contact", contactLimiter, async (req, res) => {
    if (!toEmail) {
        res.status(500)
            .json({
                error: "Contatti non configurati",
            })

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

    const {name, email, message, "cf-turnstile-response": turnstileToken} = parsed.data

    const valid = await verifyTurnstile(turnstileToken)

    if (!valid) {
        res.status(400)
            .json({error: "Captcha non valido"})

        return
    }

    const text = [`Nome: ${name}`, `E-Mail: ${email}`, "", message].join("\n")

    try {
        await smtp.sendMail({
            from: {address: email, name},
            replyTo: {address: email, name},
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

// Serve static files from /out (Next.js static export)
app.use(express.static(outDir, {
    etag: true,
    immutable: true,
    index: "index.html",
    maxAge: "1y",
}))

// SPA fallback: serve index.html for non-API routes
app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next()
    }

    res.sendFile(join(outDir, "index.html"))
})

app.listen(3001, () => {
    console.log('Server attivo su 3001', {
        corsOptions,
    })
})
