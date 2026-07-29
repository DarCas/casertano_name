/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {SectionLabel} from "@/components/section-label"

declare global {
    interface Window {
        turnstile?: {
            render: (container: HTMLElement, opts: TurnstileOptions) => string
            remove: (container: HTMLElement) => void
            reset: (container: HTMLElement) => void
        }
    }
}

interface TurnstileOptions {
    sitekey: string
    callback: (token: string) => void
    action?: string
    theme?: "light" | "dark" | "auto"
}

function Dialog({open, onClose, children}: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const el = dialogRef.current
        if (!el) return
        if (open && !el.open) el.showModal()
        else if (!open && el.open) el.close()
    }, [open])

    return (
        <dialog ref={dialogRef} onClose={onClose}
                className="fixed inset-0 z-50 m-auto w-[90vw] max-w-[420px] rounded-xl border border-white/[0.08] bg-bg-surface p-8 text-center backdrop:bg-black/60 open:flex open:flex-col open:items-center open:gap-6 max-sm:p-6">
            {children}
        </dialog>
    )
}

export function Contact() {
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL
    if (!email) return null

    const hasTurnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

    const sectionRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const turnstileRef = useRef<HTMLDivElement>(null)
    const [dialog, setDialog] = useState<"success" | "error" | null>(null)
    const [error, setError] = useState("")
    const [token, setToken] = useState(hasTurnstile ? "" : "skip")
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            {threshold: 0.1},
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!visible || !hasTurnstile) return

        const script = document.createElement("script")
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        script.async = true
        script.defer = true
        script.onload = () => {
            if (window.turnstile && turnstileRef.current) {
                window.turnstile.render(turnstileRef.current, {
                    sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
                    action: "contact-submit",
                    theme: "dark",
                    callback: (t: string) => {
                        setToken(t)
                    },
                })
            }
        }
        document.head.appendChild(script)

        return () => {
            if (window.turnstile && turnstileRef.current) {
                window.turnstile.remove(turnstileRef.current)
            }
        }
    }, [visible])

    function resetForm() {
        formRef.current?.reset()
        if (window.turnstile && turnstileRef.current) {
            window.turnstile.reset(turnstileRef.current)
        }
        setToken("")
        setError("")
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("")

        const t = token
        if (!t) {
            setError("Verifica in corso. Riprova tra qualche secondo.")
            setDialog("error")
            return
        }

        const form = formRef.current
        if (!form) return

        const data = new FormData(form)
        const name = data.get("name") as string
        const email = data.get("email") as string
        const message = data.get("message") as string

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    consent: "on",
                    "cf-turnstile-response": t,
                }),
            })

            const json = await res.json()
            if (!res.ok) {
                setError(json.error || "Errore nell'invio")
                setDialog("error")
                return
            }

            setDialog("success")
        } catch {
            setError("Errore di connessione. Riprova più tardi.")
            setDialog("error")
        }
    }

    function closeDialog() {
        if (dialog === "success") resetForm()
        setDialog(null)
    }

    return (
        <section id="contatti" ref={sectionRef}
                 className="py-[var(--gp)] px-8 text-center max-w-[1100px] mx-auto scroll-mt-[72px]">
            <SectionLabel className="mb-5">// contatti</SectionLabel>
            <h2 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">Parliamone</h2>
            <p className="text-text-secondary mb-10">Hai un progetto in mente o vuoi collaborare?
                Scrivimi.</p>

            <form ref={formRef} className="max-w-[500px] mx-auto text-left"
                  onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    required
                    autoComplete="name"
                    aria-label="Nome"
                    className="w-full px-[18px] py-[14px] rounded-lg border border-white/[0.08] bg-bg-surface text-text font-sans text-[0.9rem] mb-[14px] outline-none transition-colors duration-250 focus:border-accent focus:shadow-[0_0_0_3px_rgba(108,99,255,0.12)]"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    required
                    autoComplete="email"
                    aria-label="E-Mail"
                    className="w-full px-[18px] py-[14px] rounded-lg border border-white/[0.08] bg-bg-surface text-text font-sans text-[0.9rem] mb-[14px] outline-none transition-colors duration-250 focus:border-accent focus:shadow-[0_0_0_3px_rgba(108,99,255,0.12)]"
                />

                <textarea
                    name="message"
                    placeholder="Messaggio"
                    required
                    autoComplete="off"
                    aria-label="Messaggio"
                    className="w-full px-[18px] py-[14px] rounded-lg border border-white/[0.08] bg-bg-surface text-text font-sans text-[0.9rem] mb-[14px] outline-none transition-colors duration-250 min-h-[140px] resize-y focus:border-accent focus:shadow-[0_0_0_3px_rgba(108,99,255,0.12)]"
                />

                <label className="flex items-center gap-3 mb-[18px] cursor-pointer group px-3">
                    <input
                        type="checkbox"
                        name="consent"
                        required
                        className="peer sr-only"
                    />

                    <span
                        className="w-[18px] h-[18px] shrink-0 rounded-[5px] border border-white/[0.15] bg-bg-surface flex items-center justify-center transition-colors duration-200 peer-checked:bg-accent peer-checked:border-accent group-hover:border-white/[0.3]">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-bg opacity-0 transition-opacity duration-200 peer-checked:opacity-100">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </span>
                    <span className="text-text-secondary text-[0.8rem] leading-[1.5]">Ho letto e accetto l&apos;
                        <Link href="/privacy"
                              className="text-accent-light underline">informativa privacy</Link>.</span>
                </label>

                <button
                    type="submit"
                    disabled={!token}
                    className="w-full px-[14px] py-[14px] border-none rounded-lg bg-accent text-bg font-mono text-[0.85rem] font-semibold cursor-pointer transition-colors duration-250 hover:bg-accent-secondary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Invia messaggio
                </button>
                <div ref={turnstileRef} className="flex justify-center mt-[14px]"/>
            </form>

            <Dialog open={dialog !== null} onClose={closeDialog}>
                <div className="flex flex-col items-center gap-4">
                    {dialog === "success" ? (
                        <>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                 stroke="#00D4AA" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <p className="font-mono text-[0.95rem] text-text leading-relaxed">Grazie!<br/>Ti
                                risponderò
                                al più presto.</p>
                        </>
                    ) : (
                        <>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                 stroke="#ef4444"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                            <p className="font-mono text-[0.85rem] text-red-400 leading-relaxed">{error}</p>
                        </>
                    )}
                    <button onClick={closeDialog} autoFocus
                            className="mt-2 px-6 py-2.5 border-none rounded-lg bg-accent text-bg font-mono text-[0.8rem] font-semibold cursor-pointer transition-colors duration-250 hover:bg-accent-secondary">
                        Chiudi
                    </button>
                </div>
            </Dialog>
        </section>
    )
}
