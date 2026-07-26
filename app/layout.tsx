/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { NetworkBg } from "@/components/network"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Dario Casertano — Senior Full Stack Engineer",
  description:
    "Sistemi distribuiti, agenti AI e automazione industriale. Full stack su backend, frontend e real-time — dalla progettazione al deploy.",
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
  authors: [{name: "Dario Casertano"}],
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "Dario Casertano — Senior Full Stack Engineer",
    description:
      "Sistemi distribuiti, agenti AI e automazione industriale. Full stack su backend, frontend e real-time — dalla progettazione al deploy.",
    url: "https://casertano.name",
    siteName: "Dario Casertano",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dario Casertano — Senior Full Stack Engineer",
    description:
      "Sistemi distribuiti, agenti AI e automazione industriale. Full stack su backend, frontend e real-time — dalla progettazione al deploy.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://casertano.name",
      name: "Dario Casertano",
      givenName: "Dario",
      familyName: "Casertano",
      jobTitle: "Senior Full Stack Engineer",
      url: "https://casertano.name",
      sameAs: [
        "https://linkedin.com/in/dariocasertano",
        "https://github.com/DarCas",
        "https://t.me/QuantumTip",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Software Engineering",
        "Internet of Things",
        "Industrial Automation",
        "Web Development",
      ],
    },
  ],
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body>
        <NetworkBg />
        <div className="scanlines" />
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />
        <div className="bg-orb orb3" />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  )
}
