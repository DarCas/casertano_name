import dynamic from "next/dynamic"
import {Nav} from "@/components/nav"
import {Hero} from "@/components/hero"
import {Skills} from "@/components/skills"
import {Footer} from "@/components/footer"

const Projects = dynamic(() => import("@/components/projects").then(m => m.Projects))
const Contact = dynamic(() => import("@/components/contact").then(m => m.Contact))

function Divider() {
  return <div className="my-12 md:my-16 h-px mx-auto max-w-[200px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
}

export default function Home() {
  const hasContact = Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL)

  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Divider />
      <Skills />
      {hasContact && <><Divider /><Contact /></>}
      <Footer />
    </>
  )
}