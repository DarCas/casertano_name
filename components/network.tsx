"use client"

import {useEffect, useRef} from "react"

export function NetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    const pts: Array<{x: number; y: number; vx: number; vy: number; r: number}> = []
    const mouse = {x: -9999, y: -9999}
    const c = canvas
    const cx = ctx

    function resize() {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      pts.length = 0
      const n = Math.max(40, Math.floor((w * h) / 15000))
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.4,
        })
      }
    }

    function draw() {
      cx.clearRect(0, 0, w, h)
      const connDist = 130
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const dxm = p.x - mouse.x
        const dym = p.y - mouse.y
        const distM = Math.sqrt(dxm * dxm + dym * dym)
        if (distM < 150 && distM > 0) {
          const force = ((150 - distM) / 150) * 0.8
          p.vx += (dxm / distM) * force * 0.15
          p.vy += (dym / distM) * force * 0.15
        }
        p.vx *= 0.99
        p.vy *= 0.99

        cx.beginPath()
        cx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2)
        cx.fillStyle = "rgba(108,99,255,.55)"
        cx.fill()

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connDist) {
            cx.beginPath()
            cx.moveTo(p.x, p.y)
            cx.lineTo(q.x, q.y)
            const alpha = (1 - d / connDist) * 0.2
            cx.strokeStyle = "rgba(108,99,255," + alpha + ")"
            cx.lineWidth = 0.5
            cx.stroke()
          }
        }
      }
      requestAnimationFrame(draw)
    }

    function onResize() { resize() }
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener("resize", onResize)
    document.addEventListener("mousemove", onMouseMove)
    resize()
    draw()

    return () => {
      window.removeEventListener("resize", onResize)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-28"
    />
  )
}
