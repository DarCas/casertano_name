/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export function BackToTop({ align = "center" }: { align?: "center" | "right" }) {
    const wrapperClass = align === "right" ? "mt-16 text-right" : "mt-16 text-center"

    return (
        <div className={wrapperClass}>
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
    )
}
