import type { ReactNode } from "react"

type SectionLabelProps = {
  children: ReactNode
  size?: "sm" | "md" | "lg"
  color?: "accent-light" | "accent" | "secondary"
  className?: string
}

const sizeClasses = {
  sm: "text-[0.6rem] tracking-[0.15em]",
  md: "text-[0.65rem] tracking-[0.1em]",
  lg: "text-[0.7rem] tracking-[0.15em]",
}

const colorMap = {
  "accent-light": "text-accent-light",
  accent: "text-accent",
  secondary: "text-text-secondary",
}

export function SectionLabel({
  children,
  size = "lg",
  color = "accent-light",
  className = "",
}: SectionLabelProps) {
  return (
    <span className={`font-mono uppercase block ${sizeClasses[size]} ${colorMap[color]} ${className}`}>
      {children}
    </span>
  )
}
