"use client"

import { useEffect, useState } from "react"

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ""
const parts = email.split("@")
const user = parts[0] ?? ""
const domain = parts[1] ?? ""

export function EmailLink({ children, className }: { children?: React.ReactNode; className?: string }) {
  const [href, setHref] = useState("")

  useEffect(() => {
    if (!email) return
    setHref("mailto:" + user + "@" + domain)
  }, [])

  if (!email) return null

  return (
    <a href={href} className={className}>
      {children ?? (user + "@" + domain)}
    </a>
  )
}
