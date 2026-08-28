/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { Divider } from "@/components/divider";
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"

const Projects = dynamic(() => import("@/components/projects").then(m => m.Projects))
const Contact = dynamic(() => import("@/components/contact").then(m => m.Contact))

export default function Home() {
    const hasContact = Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL)

    return (
        <>
            <Nav/>
            <Hero/>
            <Projects/>
            <Divider/>
            <Skills/>
            {hasContact && <><Divider/><Contact/></>}
            <Footer/>
        </>
    )
}
