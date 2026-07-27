import Link from "next/link"
import { EmailLink } from "./email-link"

const socials = [
  { label: "LinkedIn", env: "NEXT_PUBLIC_SOCIAL_LINKEDIN", svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
  { label: "GitHub", env: "NEXT_PUBLIC_SOCIAL_GITHUB", svg: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/> },
  { label: "Telegram", env: "NEXT_PUBLIC_SOCIAL_TELEGRAM", svg: <><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></> },
].filter((s) => process.env[s.env])

const name = process.env.NEXT_PUBLIC_NAME ?? ""
const vat = process.env.NEXT_PUBLIC_VAT ?? ""

export function Footer() {
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const yearRange = currentYear > startYear ? `${startYear}-${currentYear}` : `${startYear}`
  return (
    <footer className="border-t border-white/[0.04] py-12 px-8">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col items-start gap-1.5">
          {name && <p className="font-mono text-[0.8rem] text-text">{name}</p>}
          <p className="font-mono text-[0.65rem] text-text-secondary tracking-[0.05em]">&copy; {yearRange} — <a href="https://github.com/DarCas/casertano_name" target="_blank" rel="noopener" className="text-inherit no-underline transition-colors duration-200 hover:text-accent">Open Source</a> — CC BY-NC-SA 4.0</p>
          {vat && <p className="font-mono text-[0.6rem] text-text-secondary tracking-[0.05em]">{vat}</p>}
          <Link href="/privacy" className="font-mono text-[0.6rem] text-text-secondary no-underline tracking-[0.05em] transition-colors duration-200 hover:text-accent">Privacy Policy</Link>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <EmailLink className="font-mono text-[0.75rem] text-text-secondary no-underline transition-colors duration-200 hover:text-accent" />
          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={process.env[s.env]!}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.06] text-text-secondary transition-colors duration-200 no-underline hover:text-accent-secondary hover:border-accent-secondary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.svg}
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
