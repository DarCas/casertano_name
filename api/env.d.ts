/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

declare namespace NodeJS {
    interface ProcessEnv {
        GLITCHTIP_AUTH_TOKEN?: string
        GLITCHTIP_DSN?: string
        NEXT_PUBLIC_API: string
        NEXT_PUBLIC_CONTACT_EMAIL: string
        NEXT_PUBLIC_NAME: string
        NEXT_PUBLIC_SOCIAL_GITHUB: string
        NEXT_PUBLIC_SOCIAL_LINKEDIN: string
        NEXT_PUBLIC_SOCIAL_TELEGRAM: string
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: string
        NEXT_PUBLIC_VAT: string
        SMTP_HOST: string
        SMTP_PASS: string
        SMTP_PORT: number
        SMTP_SECURE?: "true"
        SMTP_USER: string
        TURNSTILE_SECRET_KEY: string
    }
}
