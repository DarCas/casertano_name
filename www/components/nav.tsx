/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const hasContact = Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL)

const SECTION_IDS = ["hero", "progetti", "skills", "contatti"] as const

export function Nav() {
    const [domain, setDomain] = useState("")
    const [activeSection, setActiveSection] = useState<string>("hero")
    const [progress, setProgress] = useState(0)
    const ratiosRef = useRef<Map<string, number>>(new Map())
    const pathname = usePathname()
    const isHome = pathname === "/"
    const isProgettiPage = pathname.startsWith("/progetti")

    useEffect(() => {
        setDomain(window.location.hostname)
    }, [])

    useEffect(() => {
        const ratios = ratiosRef.current
        const ids = hasContact ? SECTION_IDS : SECTION_IDS.filter(id => id !== "contatti")
        const elements = ids
            .map(id => document.getElementById(id))
            .filter(Boolean) as HTMLElement[]

        if (elements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    ratios.set(entry.target.id, entry.intersectionRatio)
                }

                let maxRatio = 0
                let maxId = "hero"
                for (const [id, ratio] of ratios) {
                    if (ratio > maxRatio) {
                        maxRatio = ratio
                        maxId = id
                    }
                }

                setActiveSection(maxRatio > 0 ? maxId : "hero")
            },
            { rootMargin: "-72px 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
        )

        for (const el of elements) {
            observer.observe(el)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        let raf = 0
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        }
        const onScroll = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", onScroll, {passive: true})
        window.addEventListener("resize", onScroll)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isHome) return
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
        history.pushState({}, "", "/")
        setActiveSection("hero")
    }, [isHome])

    const handleSectionClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (isHome) return
        e.preventDefault()
        window.location.assign(`/#${id}`)
    }, [isHome])

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/85 border-b border-white/[0.04] px-4 sm:px-6 py-3 sm:py-[18px] flex justify-center items-center">
      <span
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-mono text-[0.6rem] sm:text-xs text-text-secondary tracking-widest hidden sm:block">
        {domain}
      </span>
            <div className="flex gap-1 sm:gap-2 justify-center items-center flex-wrap">
                <NavLink href="/" isActive={isHome && activeSection === "hero"} onClick={handleHomeClick}>Home</NavLink>
                <NavLink href={isHome ? "#progetti" : "/#progetti"} onClick={(e) => handleSectionClick(e, "progetti")} isActive={isHome ? activeSection === "progetti" : isProgettiPage}>Progetti</NavLink>
                <NavLink href={isHome ? "#skills" : "/#skills"} onClick={(e) => handleSectionClick(e, "skills")} isActive={isHome && activeSection === "skills"}>Tech Stack</NavLink>
                {hasContact && <NavLink href={isHome ? "#contatti" : "/#contatti"} onClick={(e) => handleSectionClick(e, "contatti")} isActive={isHome && activeSection === "contatti"}>Parliamone</NavLink>}
            </div>
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary"
                style={{width: `${progress * 100}%`}}
            />
        </nav>
    )
}

function NavLink({href, onClick, isActive, children}: {
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    isActive?: boolean;
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`font-mono text-[0.6rem] sm:text-xs tracking-widest uppercase px-2 sm:px-[18px] py-[6px] sm:py-[6px] rounded-full transition-colors duration-250 hover:text-accent-secondary hover:bg-accent-secondary/[0.08] ${
                isActive ? "text-accent-secondary bg-accent-secondary/[0.08]" : "text-text-secondary"
            }`}
        >
            {children}
        </Link>
    )
}
