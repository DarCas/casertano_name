/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { getProjects } from "@/lib/projects-server"
import { ServiceWorkerUpdater } from "@/components/service-worker"
import "./globals.css"
import React from "react";

const NetworkBg = dynamic(() => import("@/components/network").then(m => m.NetworkBg))

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
    weight: ["400", "600", "700"],
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
        icon: [
            {
                sizes: "128x128",
                type: "image/x-icon",
                url: "/favicon.ico",
            },
            {
                sizes: "48x48",
                type: "image/png",
                url: "/maskable_icon_x48.png",
            },
            {
                sizes: "72x72",
                type: "image/png",
                url: "/maskable_icon_x72.png",
            },
            {
                sizes: "96x96",
                type: "image/png",
                url: "/maskable_icon_x96.png",
            },
            {
                sizes: "128x128",
                type: "image/png",
                url: "/maskable_icon_x128.png",
            },
            {
                sizes: "192x192",
                type: "image/png",
                url: "/maskable_icon_x192.png",
            },
            {
                sizes: "384x384",
                type: "image/png",
                url: "/maskable_icon_x384.png",
            },
            {
                sizes: "512x512",
                type: "image/png",
                url: "/maskable_icon_x512.png",
            },
        ],
        apple: [{
            sizes: "192x192",
            type: "image/png",
            url: "/maskable_icon_x192.png",
        }],
    },
    keywords: [
        "Dario Casertano",
        "Full Stack Developer",
        "Software Engineer",
        "AI Engineer",
        "AI Agents",
        "RAG",
        "Node.js",
        "TypeScript",
        "Vue.js",
        "React",
        "Next.js",
        "PHP",
        "Laravel",
        "Fastify",
        "Blockchain",
        "Solidity",
        "NFT",
        "IoT",
        "Industrial Automation",
        "PWA",
        "WebRTC",
        "Geospatial",
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

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const projects = await getProjects()
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
                    "Blockchain",
                    "Geospatial Systems",
                    "Real-time Communication",
                ],
                name: "Dario Casertano",
                sameAs: [
                    "https://linkedin.com/in/dariocasertano",
                    "https://github.com/DarCas",
                    "https://t.me/QuantumTip",
                ],
                url: "https://casertano.name/",
            },
            {
                "@type": "ItemList",
                itemListElement: projects.map((p, i) => ( {
                    "@type": "ListItem",
                    name: p.title,
                    position: i + 1,
                    url: `https://casertano.name/progetti/${p.slug}/`,
                } )),
            },
        ],
    }

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
        <ServiceWorkerUpdater/>
        <div className="scanlines"/>
        <div className="bg-orb orb1"/>
        <div className="bg-orb orb2"/>
        <div className="bg-orb orb3"/>
        <main className="relative z-10">{children}</main>
        </body>
        </html>
    )
}
