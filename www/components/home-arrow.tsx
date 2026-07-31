/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useEffect, useState } from "react"

export function HomeArrow() {
    const [href, setHref] = useState("/")

    useEffect(() => {
        const update = () => {
            setHref(window.location.hash === "#from-contact" ? "/#contatti" : "/")
        }
        update()
        window.addEventListener("hashchange", update)
        return () => window.removeEventListener("hashchange", update)
    }, [])

    return (
        <a
            href={href}
            aria-label="torna alla homepage"
            className="font-mono text-accent hover:text-accent-light transition-colors shrink-0 no-underline text-[clamp(1.2rem,2.5vw,1.6rem)]"
        >
            &larr;
        </a>
    )
}
