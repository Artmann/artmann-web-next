'use client'

import { useEffect, useRef, type ReactElement } from 'react'

import ParticleField from './particle-field'

// A winding trail down the left margin, drawn in as the reader scrolls.
// Dash math uses pathLength-normalized units (0-100); the ember tip uses
// real user units via getPointAtLength — never mix the two.
const trailRoute =
  'M 32 10 C 14 54, 46 92, 28 138 S 12 226, 30 268 S 44 330, 27 360'

export default function MarginCompanions(): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const maskRef = useRef<SVGPathElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    const route = routeRef.current
    const maskPath = maskRef.current
    const tip = tipRef.current

    if (!root || !svg || !route || !maskPath || !tip) {
      return
    }

    const totalLength = route.getTotalLength()

    let scaleX = 0
    let scaleY = 0
    let isLit = false
    let frame: number | null = null

    const measure = (): void => {
      const rect = svg.getBoundingClientRect()

      scaleX = rect.width / 56
      scaleY = rect.height / 400

      const max = document.documentElement.scrollHeight - window.innerHeight
      const isShort = max < window.innerHeight * 1.5

      if (isShort) {
        root.setAttribute('data-short', '')
        root.classList.remove('is-active')
      } else {
        root.removeAttribute('data-short')
        root.classList.add('is-active')
      }
    }

    const update = (): void => {
      frame = null

      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      root.style.setProperty('--reading-dusk', progress.toFixed(4))
      maskPath.setAttribute('stroke-dashoffset', String(100 - progress * 100))

      const point = route.getPointAtLength(progress * totalLength)

      tip.style.transform = `translate3d(${point.x * scaleX - 3}px, ${point.y * scaleY - 3}px, 0)`

      // Hysteresis so the tent doesn't flicker at the threshold.
      if (!isLit && progress >= 0.98) {
        isLit = true
        root.classList.add('is-lit')
      } else if (isLit && progress < 0.95) {
        isLit = false
        root.classList.remove('is-lit')
      }
    }

    const schedule = (): void => {
      if (frame === null) {
        frame = requestAnimationFrame(update)
      }
    }

    const handleResize = (): void => {
      measure()
      schedule()
    }

    measure()
    update()

    const resizeObserver = new ResizeObserver(handleResize)

    resizeObserver.observe(document.body)
    resizeObserver.observe(svg)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()

      if (frame !== null) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <div
      aria-hidden
      className="margin-companions pointer-events-none fixed inset-0 z-10 hidden xl:block"
      ref={rootRef}
    >
      <div className="absolute inset-y-0 left-0 w-36">
        <div className="dusk-layer-amber" />
        <div className="dusk-layer-plum" />
      </div>

      <div className="dusk-strip-right absolute inset-y-0 right-0 w-36">
        <div className="dusk-layer-amber" />
        <div className="dusk-layer-plum" />

        <ParticleField
          className="absolute inset-0 h-full w-full"
          count={3}
          mode="fireflies"
          scale={0.8}
        />

        <span
          className="dusk-star"
          style={{ right: 44, top: '14vh' }}
        >
          <span className="dusk-star-core" />
        </span>
        <span
          className="dusk-star"
          style={{ right: 104, top: '26vh' }}
        >
          <span
            className="dusk-star-core"
            style={{ animationDelay: '2.2s' }}
          />
        </span>
      </div>

      <div className="absolute left-4 top-[22vh] h-[56vh] w-14">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          ref={svgRef}
          viewBox="0 0 56 400"
        >
          <defs>
            <mask id="trail-walked-mask">
              <path
                d={trailRoute}
                fill="none"
                pathLength={100}
                ref={maskRef}
                stroke="white"
                strokeDasharray="100 100"
                strokeDashoffset="100"
                strokeWidth="8"
                vectorEffect="non-scaling-stroke"
              />
            </mask>
          </defs>

          <path
            d={trailRoute}
            fill="none"
            pathLength={100}
            ref={routeRef}
            stroke="#71222f"
            strokeDasharray="1.1 1.7"
            strokeLinecap="round"
            strokeOpacity="0.13"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={trailRoute}
            fill="none"
            mask="url(#trail-walked-mask)"
            pathLength={100}
            stroke="#d97706"
            strokeDasharray="1.1 1.7"
            strokeLinecap="round"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          <g transform="translate(28 378)">
            <circle
              className="trail-tent-glow trail-tent-glow-outer"
              fill="#fbbf24"
              r="10"
            />
            <circle
              className="trail-tent-glow trail-tent-glow-inner"
              fill="#fbbf24"
              r="5"
            />
            <path
              className="trail-tent-lines"
              d="M-9 6 L0 -7 L9 6 Z"
              fill="none"
              strokeLinejoin="round"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="trail-tent-lines"
              d="M-2.5 6 L0 1.5 L2.5 6"
              fill="none"
              strokeLinejoin="round"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        <div
          className="reading-ember absolute left-0 top-0 h-1.5 w-1.5 rounded-full"
          ref={tipRef}
          style={{ background: '#fbbf24' }}
        />
      </div>
    </div>
  )
}
