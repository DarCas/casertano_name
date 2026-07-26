import {Nav} from "@/components/nav"
import {Hero} from "@/components/hero"
import {Projects} from "@/components/projects"
import {Skills} from "@/components/skills"
import {Contact} from "@/components/contact"
import {Footer} from "@/components/footer"

export const revalidate = 3600

function Divider() {
  return <div className="my-12 md:my-16 h-px mx-auto max-w-[200px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Contact />
      <Footer />
    </>
  )
}