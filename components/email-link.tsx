"use client"

import { useEffect, useState } from "react"

const user = "dario"
const domain = "casertano.name"

export function EmailLink({ children, className }: { children?: React.ReactNode; className?: string }) {
  const [href, setHref] = useState("")

  useEffect(() => {
    setHref("mailto:" + user + "@" + domain)
  }, [])

  return (
    <a href={href} className={className}>
      {children ?? (user + "@" + domain)}
    </a>
  )
}
