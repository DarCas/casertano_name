/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import Link from "next/link"
import { NetworkBg } from "@/components/network"

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-bg relative overflow-hidden px-6">
            <NetworkBg />
            <div className="bg-orb orb1" />
            <div className="bg-orb orb2" />
            <div className="bg-orb orb3" />
            <div className="scanlines" />

            <div className="relative z-10 text-center">
                <h1 className="glitch-404" aria-label="404">404</h1>

                <p className="font-mono text-text-secondary text-[0.75rem] tracking-[0.2em] uppercase mt-6 mb-10">
                    // destinazione irraggiungibile
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 font-mono text-[0.8rem] text-text-secondary no-underline border border-white/[0.08] rounded-full px-5 py-2 transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    torna alla homepage
                </Link>
            </div>

            <style>{`
                .glitch-404 {
                    position: relative;
                    font-family: "JetBrains Mono", monospace;
                    font-size: clamp(6rem, 18vw, 14rem);
                    font-weight: 700;
                    line-height: 1;
                    color: #EDEDEF;
                    text-shadow:
                        0 0 30px rgba(108, 99, 255, 0.4),
                        0 0 60px rgba(108, 99, 255, 0.15);
                }

                .glitch-404::before,
                .glitch-404::after {
                    content: "404";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .glitch-404::before {
                    color: #6C63FF;
                    animation: glitchTop 2.5s infinite steps(1);
                    clip-path: inset(0 0 60% 0);
                }

                .glitch-404::after {
                    color: #00D4AA;
                    animation: glitchBottom 2.8s infinite steps(1);
                    clip-path: inset(60% 0 0 0);
                }

                @keyframes glitchTop {
                    0%, 28%, 30%, 58%, 60%, 82%, 84%, 100% { transform: translate(0); }
                    29% { transform: translate(-4px, 1px); }
                    59% { transform: translate(4px, -1px); }
                    83% { transform: translate(-2px, 2px); }
                }

                @keyframes glitchBottom {
                    0%, 28%, 30%, 58%, 60%, 82%, 84%, 100% { transform: translate(0); }
                    29% { transform: translate(3px, -1px); }
                    59% { transform: translate(-3px, 1px); }
                    83% { transform: translate(2px, -1px); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .glitch-404::before,
                    .glitch-404::after {
                        display: none;
                    }
                }
            `}</style>
        </main>
    )
}
