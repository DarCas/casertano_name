import {hashDelay} from "@/lib/utils"

const sizes = {
  sm: "text-[0.6rem] px-[10px] py-[3px]",
  md: "text-[0.65rem] px-[14px] py-[6px]",
} as const

export function Tag({children, size = "sm", className = ""}: {children: string; size?: keyof typeof sizes; className?: string}) {
  return (
    <span
      className={`font-mono rounded-full bg-bg-surface border border-white/[0.06] text-text-secondary animate-tagHeroGlow ${sizes[size]} ${className}`}
      style={{animationDelay: `${hashDelay(children)}s`}}
    >
      {children}
    </span>
  )
}
