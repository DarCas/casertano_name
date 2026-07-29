/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Metadata } from "next"
import Link from "next/link"
import { EmailLink } from "@/components/email-link"
import { SectionLabel } from "@/components/section-label"

export const metadata: Metadata = {
    title: "Privacy Policy — Dario Casertano",
    robots: {index: false, follow: false},
}

function Divider() {
    return <div
        className="my-12 h-px mx-auto max-w-[200px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"/>
}

export default function PrivacyPage() {
    return (
        <main className="max-w-[720px] mx-auto px-8 py-20">
            <Link
                href="/#contatti"
                className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-text-secondary no-underline border border-white/[0.08] rounded-full px-4 py-1.5 transition-colors duration-200 hover:border-accent hover:text-accent"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                </svg>
                torna alla homepage
            </Link>

            <SectionLabel color="accent" className="mt-14 mb-5">// privacy</SectionLabel>
            <h1 className="font-mono text-[clamp(1.3rem,2.5vw,1.8rem)] mb-2">Privacy Policy</h1>
            <p className="font-mono text-[0.7rem] text-text-secondary/[0.4] mb-6">Ultimo
                aggiornamento: 26 luglio 2026</p>

            <Divider/>

            <section className="mb-10">
                <h2 className="font-mono text-[1rem] text-text mb-4">1. Titolare del
                    trattamento</h2>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8]">
                    Dario Casertano<br/>
                    Bitetto (BA), Italia<br/>
                    Email: <EmailLink
                    className="text-accent no-underline hover:underline transition-colors duration-200"/><br/>
                    Sito: <a href="https://casertano.name"
                             className="text-accent no-underline hover:underline transition-colors duration-200">casertano.name</a>
                </p>
            </section>

            <Divider/>

            <section className="mb-10">
                <h2 className="font-mono text-[1rem] text-text mb-6">2. Dati raccolti e
                    finalità</h2>

                <h3 className="font-mono text-[0.85rem] text-accent mb-2">2.1 Modulo di
                    contatto</h3>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8] mb-6">
                    I dati inseriti volontariamente dall&apos;utente nel modulo di contatto (nome,
                    email e messaggio) vengono utilizzati
                    esclusivamente per rispondere alla richiesta.                     L&apos;invio avviene tramite un
                    server che inoltra il
                    messaggio via email al titolare; i dati non vengono memorizzati in modo
                    persistente sul server oltre il tempo
                    necessario all&apos;invio. Una volta ricevuti via email, vengono conservati per
                    il tempo necessario a gestire
                    la richiesta e comunque non oltre 12 mesi.
                </p>

                <h3 className="font-mono text-[0.85rem] text-accent mb-2">2.2 Cookie</h3>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8] mb-6">
                    Questo sito non utilizza cookie di profilazione, cookie analitici o altre
                    tecnologie di tracciamento.
                    Nessun dato viene condiviso con terze parti per finalità di marketing o analisi.
                </p>

                <h3 className="font-mono text-[0.85rem] text-accent mb-2">2.3 Dati di
                    navigazione</h3>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8] mb-6">
                    I server web registrano gli indirizzi IP, il browser, il sistema operativo e le
                    pagine visitate per finalità
                    di sicurezza e funzionamento tecnico del sito. Questi dati vengono conservati
                    per 30 giorni e non vengono
                    incrociati con altre fonti di dati.
                </p>

                <h3 className="font-mono text-[0.85rem] text-accent mb-2">2.4 Cloudflare
                    Turnstile</h3>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8] mb-6">
                    Il modulo di contatto utilizza <a
                    href="https://www.cloudflare.com/products/turnstile/" target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent no-underline hover:underline transition-colors duration-200">Cloudflare
                    Turnstile</a>,
                    un servizio di protezione anti-bot che verifica automaticamente se l&apos;utente
                    è umano senza richiedere
                    un intervento manuale. Turnstile raccoglie i seguenti dati per la verifica:
                </p>
                <ul className="text-text-secondary text-[0.9rem] leading-[1.8] mb-6 space-y-1">
                    {[
                        "indirizzo IP",
                        "user agent del browser",
                        "informazioni sulla finestra e sulla risoluzione dello schermo",
                        "lingua del sistema operativo",
                        "interazione con la pagina (movimenti del mouse, temporizzazione)",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span
                                className="mt-[7px] w-[5px] h-[5px] rounded-full bg-accent shrink-0"/>
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8]">
                    I dati vengono trattati da Cloudflare, Inc. secondo la loro{" "}
                    <a href="https://www.cloudflare.com/privacypolicy/" target="_blank"
                       rel="noopener noreferrer"
                       className="text-accent no-underline hover:underline transition-colors duration-200">informativa
                        privacy</a>.
                    Il trattamento si basa sul legittimo interesse del titolare a proteggere il sito
                    da spam e abusi
                    (Art. 6 par. 1 lett. f GDPR).
                </p>
            </section>

            <Divider/>

            <section className="mb-10">
                <h2 className="font-mono text-[1rem] text-text mb-6">3. Base giuridica</h2>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8] mb-6">
                    Il trattamento dei dati del modulo di contatto si basa sul consenso
                    dell&apos;interessato
                    (Art. 6 par. 1 lett. a GDPR), manifestato tramite l&apos;invio volontario del
                    messaggio.
                </p>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8]">
                    Il trattamento dei dati di navigazione si basa sul legittimo interesse del
                    titolare
                    (Art. 6 par. 1 lett. f GDPR) a garantire la sicurezza del sito, prevenire abusi
                    e
                    assicurare il corretto funzionamento tecnico.
                </p>
            </section>

            <Divider/>

            <section className="mb-10">
                <h2 className="font-mono text-[1rem] text-text mb-4">4. Diritti
                    dell&apos;interessato</h2>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8] mb-3">
                    Ai sensi degli artt. 15-22 GDPR, l&apos;utente ha diritto di:
                </p>
                <ul className="text-text-secondary text-[0.9rem] leading-[1.8] space-y-1">
                    {[
                        "accedere ai propri dati personali (Art. 15)",
                        "ottenere la rettifica (Art. 16) o la cancellazione (Art. 17)",
                        "richiedere la limitazione del trattamento (Art. 18)",
                        "ottenere la portabilità dei dati (Art. 20)",
                        "opporsi al trattamento (Art. 21)",
                        "proporre reclamo al Garante per la Protezione dei Dati Personali",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span
                                className="mt-[7px] w-[5px] h-[5px] rounded-full bg-accent shrink-0"/>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            <Divider/>

            <section>
                <h2 className="font-mono text-[1rem] text-text mb-4">5. Contatti</h2>
                <p className="text-text-secondary text-[0.9rem] leading-[1.8]">
                    Per esercitare i tuoi diritti o per qualsiasi domanda relativa alla privacy,
                    scrivi a:
                    <br/>
                    <EmailLink
                        className="text-accent no-underline hover:underline transition-colors duration-200"/>
                </p>
            </section>

            <div className="mt-16 text-center">
                <a
                    href="#"
                    className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-text-secondary no-underline border border-white/[0.08] rounded-full px-4 py-1.5 transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14"/>
                        <path d="M5 12l7-7 7 7"/>
                    </svg>
                    torna su
                </a>
            </div>
        </main>
    )
}
