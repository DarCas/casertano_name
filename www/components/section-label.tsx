/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { ReactNode } from "react"

type SectionLabelProps = {
    children: ReactNode
    className?: string
    color?: "accent-light" | "accent" | "secondary"
    size?: "sm" | "md" | "lg"
    uppercase?: boolean
}

const sizeClasses = {
    lg: "text-[0.7rem] tracking-[0.15em]",
    md: "text-[0.65rem] tracking-[0.1em]",
    sm: "text-[0.6rem] tracking-[0.15em]",
}

const colorMap = {
    accent: "text-accent",
    "accent-light": "text-accent-light",
    secondary: "text-text-secondary",
}

export function SectionLabel(props: SectionLabelProps) {
    const {
        children,
        className = "",
        color = "accent-light",
        size = "lg",
        uppercase = true,
    } = props

    return (
        <span className={`font-mono block ${uppercase ? "uppercase" : ""} ${sizeClasses[ size ]} ${colorMap[ color ]} ${className}`}>
      {children}
    </span>
    )
}
