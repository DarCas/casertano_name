/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const hasContact = Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL)

export function Nav() {
    const [domain, setDomain] = useState("")

    useEffect(() => {
        setDomain(window.location.hostname)
    }, [])

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/85 border-b border-white/[0.04] px-4 sm:px-6 py-3 sm:py-[18px] flex justify-center items-center">
      <span
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-mono text-[0.6rem] sm:text-xs text-text-secondary tracking-widest hidden sm:block">
        {domain}
      </span>
            <div className="flex gap-1 sm:gap-2 justify-center items-center flex-wrap">
                <NavLink href="/" onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({top: 0, behavior: "smooth"});
                    history.pushState({}, "", "/")
                }}>Home</NavLink>
                <NavLink href="#progetti">Progetti</NavLink>
                <NavLink href="#skills">Tech Stack</NavLink>
                {hasContact && <NavLink href="#contatti">Parliamone</NavLink>}
            </div>
        </nav>
    )
}

function NavLink({href, onClick, children}: {
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="font-mono text-[0.6rem] sm:text-xs tracking-widest uppercase px-2 sm:px-[18px] py-[6px] sm:py-[6px] rounded-full text-text-secondary transition-colors duration-250 hover:text-accent-secondary hover:bg-accent-secondary/[0.08]"
        >
            {children}
        </Link>
    )
}
