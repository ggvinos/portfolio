'use client'
import { useEffect, useRef } from 'react'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Assina o scroll uma vez e chama `apply` dentro de um rAF.
 * Escreve direto no style do elemento — sem setState, sem re-render por frame.
 */
function useScrollEffect(apply: (el: HTMLElement) => void) {
  const ref = useRef<HTMLElement>(null)
  const applyRef = useRef(apply)
  applyRef.current = apply

  useEffect(() => {
    if (reduced()) return
    let raf = 0

    const run = () => {
      raf = 0
      if (ref.current) applyRef.current(ref.current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}

/**
 * Parallax vertical suave. `speed` é a fração da altura da viewport que o
 * elemento desloca ao atravessar a tela inteira. Positivo = sobe mais devagar.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.12) {
  return useScrollEffect((el) => {
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const center = rect.top + rect.height / 2
    const progress = (center - vh / 2) / vh
    el.style.transform = `translate3d(0, ${(progress * speed * vh).toFixed(1)}px, 0)`
  }) as React.RefObject<T>
}

/**
 * Faz o conteúdo do hero recuar ao sair de cena: opacidade cai, desloca
 * levemente para baixo e reduz de escala. Encerra em uma altura de viewport.
 */
export function useScrollRecede<T extends HTMLElement = HTMLDivElement>() {
  return useScrollEffect((el) => {
    const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
    el.style.opacity = String(Math.max(0, 1 - p * 1.35))
    el.style.transform = `translate3d(0, ${(p * 70).toFixed(1)}px, 0) scale(${(1 - p * 0.05).toFixed(4)})`
  }) as React.RefObject<T>
}
