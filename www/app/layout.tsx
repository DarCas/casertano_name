/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import React from "react";

const NetworkBg = dynamic(() => import("@/components/network").then(m => m.NetworkBg))

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-plus-jakarta-sans",
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
})


const description = "Sistemi distribuiti, agenti AI e automazione industriale. Full stack su backend, frontend e real-time — dalla progettazione al deploy."

export const metadata: Metadata = {
    alternates: {
        canonical: "https://casertano.name/",
    },
    authors: [{
        name: "Dario Casertano",
        url: "https://casertano.name/",
    }],
    description,
    icons: {
        icon: "/favicon.svg",
        apple: "/apple-touch-icon.svg",
    },
    keywords: [
        "Dario Casertano",
        "Full Stack Developer",
        "Software Engineer",
        "AI Engineer",
        "Node.js",
        "TypeScript",
        "Vue.js",
        "PHP",
        "Laravel",
        "IoT",
        "Industrial Automation",
    ],
    metadataBase: new URL('/', process.env.NEXT_PUBLIC_API!),
    openGraph: {
        description,
        images: "/opengraph.jpeg",
        locale: "it_IT",
        siteName: "Dario Casertano",
        title: "Dario Casertano — Senior Full Stack Engineer",
        type: "website",
        url: "https://casertano.name",
    },
    title: "Dario Casertano — Senior Full Stack Engineer",
    twitter: {
        card: "summary_large_image",
        description,
        images: "/opengraph.jpeg",
        title: "Dario Casertano — Senior Full Stack Engineer",
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@id": "https://casertano.name/",
            "@type": "Person",
            email: "dario@casertano.name",
            familyName: "Casertano",
            givenName: "Dario",
            image: "https://casertano.name/opengraph.jpeg",
            jobTitle: "Senior Full Stack Engineer",
            knowsAbout: [
                "Artificial Intelligence",
                "Software Engineering",
                "Internet of Things",
                "Industrial Automation",
                "Web Development",
            ],
            name: "Dario Casertano",
            sameAs: [
                "https://linkedin.com/in/dariocasertano",
                "https://github.com/DarCas",
                "https://t.me/QuantumTip",
            ],
            url: "https://casertano.name/",
        },
    ],
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="it" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
        <head>
            <meta name="theme-color" content="#0A0A0B"/>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </head>
        <body>
        <NetworkBg/>
        <div className="scanlines"/>
        <div className="bg-orb orb1"/>
        <div className="bg-orb orb2"/>
        <div className="bg-orb orb3"/>
        <main className="relative z-10">{children}</main>
        </body>
        </html>
    )
}
