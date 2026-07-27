import Link from "next/link"

const hasContact = Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL)

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/85 border-b border-white/[0.04] px-4 sm:px-6 py-3 sm:py-[18px] flex justify-center items-center">
      <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-mono text-[0.6rem] sm:text-xs text-text-secondary tracking-widest hidden sm:block">
        casertano.name
      </span>
      <div className="flex gap-1 sm:gap-2 justify-center items-center flex-wrap">
        <NavLink href="#hero">Home</NavLink>
        <NavLink href="#progetti">Progetti</NavLink>
        <NavLink href="#skills">Tech Stack</NavLink>
        {hasContact && <NavLink href="#contatti">Parliamone</NavLink>}
      </div>
    </nav>
  )
}

function NavLink({href, children}: {href: string; children: React.ReactNode}) {
  return (
    <Link
      href={href}
      className="font-mono text-[0.6rem] sm:text-xs tracking-widest uppercase px-2 sm:px-[18px] py-[6px] sm:py-[6px] rounded-full text-text-secondary transition-colors duration-250 hover:text-accent-secondary hover:bg-accent-secondary/[0.08]"
    >
      {children}
    </Link>
  )
}