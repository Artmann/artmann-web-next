'use client'

import { useEffect, useRef, type ReactElement } from 'react'

export default function ReadingProgress(): ReactElement {
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const emberRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const fill = fillRef.current
    const ember = emberRef.current

    if (!track || !fill || !ember) {
      return
    }

    const measure = (): void => {
      const header = document.getElementById('site-header')

      track.style.top = header
        ? `${header.getBoundingClientRect().height}px`
        : '0px'
    }

    let frame: number | null = null

    const update = (): void => {
      frame = null

      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      fill.style.transform = `scaleX(${progress})`
      ember.style.transform = `translateX(${progress * (window.innerWidth - 6)}px)`
    }

    const handleScroll = (): void => {
      if (frame === null) {
        frame = requestAnimationFrame(update)
      }
    }

    const handleResize = (): void => {
      measure()
      handleScroll()
    }

    measure()
    update()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)

      if (frame !== null) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 z-30 xl:hidden"
      ref={trackRef}
    >
      <div className="relative h-0.5 w-full">
        <div
          className="h-full w-full origin-left"
          ref={fillRef}
          style={{
            background: 'linear-gradient(90deg, #2b0e14, #f59e0b)',
            transform: 'scaleX(0)'
          }}
        />
        <div
          className="reading-ember absolute -top-0.5 left-0 h-1.5 w-1.5 rounded-full"
          ref={emberRef}
          style={{ background: '#fbbf24' }}
        />
      </div>
    </div>
  )
}
