'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [hasMouse, setHasMouse] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // detecta pointer fino (mouse real)
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    setHasMouse(true)

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      setVisible(true)

      const dot = dotRef.current
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }

      const target = e.target as Element
      const ring = ringRef.current
      if (!ring) return

      const isLink = target.closest('a, button') !== null
      const isText = ['P', 'H1', 'H2', 'H3', 'SPAN', 'LI'].includes(
        target.tagName
      )

      ring.classList.toggle('is-link', isLink && !isText)
      ring.classList.toggle('is-text', isText && !isLink)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)

      const el = ringRef.current
      if (el) {
        const w = parseFloat(getComputedStyle(el).width) || 30
        const h = parseFloat(getComputedStyle(el).height) || 30
        el.style.transform = `translate(${ring.current.x - w / 2}px, ${ring.current.y - h / 2}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!hasMouse) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? undefined : 0 }}
      />
    </>
  )
}
