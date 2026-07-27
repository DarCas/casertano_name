/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { hashDelay } from "@/lib/utils"

const sizes = {
    sm: "text-[0.6rem] px-[10px] py-[3px]",
    md: "text-[0.65rem] px-[14px] py-[6px]",
} as const

export function Tag({children, size = "sm", className = ""}: {
    children: string
    className?: string
    size?: keyof typeof sizes
}) {
    return (
        <span
            className={`font-mono rounded-full bg-bg-surface border border-white/[0.06] text-text-secondary animate-tagHeroGlow ${sizes[ size ]} ${className}`}
            style={{animationDelay: `${hashDelay(children)}s`}}
        >
      {children}
    </span>
    )
}
