/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useState, useEffect } from "react"
import { categories } from "@/lib/skills"
import { Tag } from "@/components/tag"

const heroSkills = [
    "Agentic AI", "LangChain", "OpenAI", "RAG",
    "TypeScript", "Node.js", "Vue", "Docker",
    "Solidity", "Ethers.js", "WebRTC", "MQTT",
]

export function Hero() {
    const [visible, setVisible] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(false)

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true)
            setButtonVisible(true)
        } else {
            setTimeout(() => setVisible(true), 100)
            setTimeout(() => setButtonVisible(true), 800)
        }
    }, [])

    return (
        <section
            id="hero"
            className="hero min-h-screen flex justify-center items-center flex-col text-center px-8 pt-[120px] pb-[60px] relative scroll-mt-[72px]"
        >
            <span
              className={`font-mono text-xs text-accent-light tracking-[0.08em] mb-4 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
            >
                // senior_full_stack_engineer
            </span>
            <h1 className="font-mono text-[clamp(1.5rem,4.5vw,3.2rem)] font-semibold leading-[1.15] mb-5">
                Dario <span className="text-accent-secondary">Casertano</span>
            </h1>
            <p className="max-w-[620px] text-[clamp(0.95rem,1.4vw,1.15rem)] text-text-secondary leading-[1.7] mb-9">
                Sistemi distribuiti, agenti AI, automazione industriale. Full stack su backend,
                frontend e real-time &mdash; dalla progettazione al deploy.
            </p>
            <div className={`flex flex-wrap justify-center gap-3 mb-9 transition-all duration-700 delay-150 ${visible ? "opacity-100" : "opacity-0"}`}>
                <span className="inline-flex font-mono text-[0.65rem] leading-none overflow-hidden rounded-[3px]">
                    <span className="bg-bg-surface text-white/80 px-2 py-[5px]">experience</span>
                    <span className="bg-amber-400 text-bg px-2 py-[5px]">15+ years</span>
                </span>
                <span className="inline-flex font-mono text-[0.65rem] leading-none overflow-hidden rounded-[3px]">
                    <span className="bg-bg-surface text-white/80 px-2 py-[5px]">stack</span>
                    <span className="bg-accent text-bg px-2 py-[5px]">full stack · ai · automation</span>
                </span>
                <span className="inline-flex font-mono text-[0.65rem] leading-none overflow-hidden rounded-[3px]">
                    <span className="bg-bg-surface text-white/80 px-2 py-[5px]">skills</span>
                    <span className="bg-emerald-400 text-bg px-2 py-[5px]">{
                        categories.reduce((a, c) => a + c.items.length, 0)
                    }+</span>
                </span>
                <span className="inline-flex font-mono text-[0.65rem] leading-none overflow-hidden rounded-[3px]">
                    <span className="bg-bg-surface text-white/80 px-2 py-[5px]">coffee</span>
                    <span className="bg-rose-400 text-bg px-2 py-[5px]">required</span>
                </span>
            </div>
            <div
                className={`flex flex-wrap justify-center gap-[10px] max-w-[680px] transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}
            >
                {heroSkills.map((s) => (
                    <Tag key={s} size="md" className="tracking-[0.03em]">{s}</Tag>
                ))}
            </div>
            <a
                href="#progetti"
                className={`inline-flex items-center gap-2 font-mono text-xs font-semibold text-bg bg-accent px-7 py-3 rounded-lg mt-10 transition-all duration-700 hover:bg-accent-secondary no-underline ${buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
                Vedi i progetti ↓
            </a>
        </section>
    )
}
