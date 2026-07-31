/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { SectionLabel } from "@/components/section-label";
import { useEffect, useState } from "react"

const DEFAULT_SECONDS = 10

export function RedirectTimer({href, seconds = DEFAULT_SECONDS}: {
    href: string;
    seconds?: number
}) {
    const [remaining, setRemaining] = useState(seconds)

    useEffect(() => {
        const id = setInterval(() => {
            setRemaining(r => {
                if (r <= 1) {
                    clearInterval(id)
                    window.location.replace(href)
                    return 0
                }
                return r - 1
            })
        }, 1000)
        return () => clearInterval(id)
    }, [href])

    return (
        <SectionLabel className="mb-5" uppercase={false}>
            // reindirizzamento automatico alla homepage in {remaining}
        </SectionLabel>
    )
}
