'use client'

import { useEffect, useRef, type ReactElement } from 'react'

type ParticleMode = 'embers' | 'fireflies'

interface ParticleFieldProps {
  className?: string
  count?: number
  mode: ParticleMode

  /**
   * Scales particle size and speed. Smaller surfaces like the header strip
   * use a smaller scale than the full-height hero field.
   */
  scale?: number
}

interface Particle {
  color: number
  phase: number
  pulseSpeed: number
  retargetIn: number
  size: number
  speed: number
  sway: number
  swaySpeed: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  x: number
  y: number
}

// Paired with the --color-ember/--color-firefly tokens in globals.css.
// The canvas can't read CSS variables without a getComputedStyle dance,
// so the palette lives here as constants.
const palettes: Record<ParticleMode, string[]> = {
  embers: ['#ffb46b', '#ff9a3c', '#ffd9a0'],
  fireflies: ['#d9e86f', '#e8f0a3']
}

const defaultCounts: Record<ParticleMode, number> = {
  embers: 18,
  fireflies: 7
}

const maxCounts: Record<ParticleMode, number> = {
  embers: 25,
  fireflies: 10
}

// Embers extinguish once they've risen past this fraction of the height.
const emberTravelTop = 0.45

function hexToRgba(hex: string, alpha: number): string {
  const value = parseInt(hex.slice(1), 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createSprite(color: string): HTMLCanvasElement {
  const size = 32
  const sprite = document.createElement('canvas')

  sprite.width = size
  sprite.height = size

  const context = sprite.getContext('2d')

  if (!context) {
    return sprite
  }

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )

  gradient.addColorStop(0, 'rgba(255, 247, 232, 0.9)')
  gradient.addColorStop(0.25, hexToRgba(color, 0.8))
  gradient.addColorStop(1, hexToRgba(color, 0))

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  return sprite
}

function spawnEmber(width: number, height: number, initial: boolean): Particle {
  const travelTop = height * emberTravelTop

  return {
    color: Math.floor(Math.random() * palettes.embers.length),
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 4 + Math.random() * 4,
    retargetIn: 0,
    size: 1.5 + Math.random() * 1.5,
    speed: 8 + Math.random() * 11,
    sway: 6 + Math.random() * 10,
    swaySpeed: 0.4 + Math.random() * 0.6,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    x: Math.random() * width,
    y: initial
      ? travelTop + Math.random() * (height - travelTop)
      : height + 4 + Math.random() * 12
  }
}

function spawnFirefly(width: number, height: number): Particle {
  return {
    color: Math.floor(Math.random() * palettes.fireflies.length),
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.4 + Math.random() * 0.5,
    retargetIn: Math.random() * 3,
    size: 1.6 + Math.random() * 0.8,
    speed: 5 + Math.random() * 6,
    sway: 0,
    swaySpeed: 0,
    targetX: Math.random() * width,
    targetY: Math.random() * height,
    vx: 0,
    vy: 0,
    x: Math.random() * width,
    y: Math.random() * height
  }
}

export default function ParticleField({
  className = '',
  count,
  mode,
  scale = 1
}: ParticleFieldProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    const smallScreenQuery = window.matchMedia('(max-width: 640px)')

    const sprites = palettes[mode].map(createSprite)

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frame: number | null = null
    let lastTime = 0
    let elapsed = 0
    let isPageVisible = document.visibilityState === 'visible'
    let isIntersecting = true

    const targetCount = (): number => {
      const base = Math.min(count ?? defaultCounts[mode], maxCounts[mode])

      return smallScreenQuery.matches ? Math.ceil(base / 2) : base
    }

    const buildParticles = (): void => {
      particles = Array.from({ length: targetCount() }, () =>
        mode === 'embers'
          ? spawnEmber(width, height, true)
          : spawnFirefly(width, height)
      )
    }

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const hadSize = width > 0 && height > 0

      width = rect.width
      height = rect.height

      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!hadSize && width > 0 && height > 0) {
        buildParticles()
      } else {
        for (const particle of particles) {
          particle.x = Math.min(particle.x, width)
          particle.targetX = Math.min(particle.targetX, width)
          particle.targetY = Math.min(particle.targetY, height)
        }
      }
    }

    const updateEmber = (particle: Particle, dt: number): number => {
      const travelTop = height * emberTravelTop

      particle.y -= particle.speed * scale * dt

      if (particle.y <= travelTop) {
        Object.assign(particle, spawnEmber(width, height, false))
      }

      const fadeIn = Math.max(0, Math.min(1, (height - particle.y) / 40))
      const fadeOut = Math.max(
        0,
        Math.min(1, (particle.y - travelTop) / (height * 0.15))
      )
      const flicker =
        0.7 + 0.3 * Math.sin(elapsed * particle.pulseSpeed + particle.phase * 3)

      return fadeIn * fadeOut * flicker * 0.9
    }

    const updateFirefly = (particle: Particle, dt: number): number => {
      particle.retargetIn -= dt

      if (particle.retargetIn <= 0) {
        particle.targetX = Math.random() * width
        particle.targetY = Math.random() * height
        particle.retargetIn = 2 + Math.random() * 3
      }

      const dx = particle.targetX - particle.x
      const dy = particle.targetY - particle.y
      const distance = Math.hypot(dx, dy) || 1
      const ease = Math.min(1, dt * 0.8)

      particle.vx +=
        ((dx / distance) * particle.speed * scale - particle.vx) * ease
      particle.vy +=
        ((dy / distance) * particle.speed * scale - particle.vy) * ease
      particle.x += particle.vx * dt
      particle.y += particle.vy * dt

      const pulse = Math.max(
        0,
        Math.sin(elapsed * particle.pulseSpeed + particle.phase)
      )

      return Math.pow(pulse, 3) * 0.9
    }

    const tick = (time: number): void => {
      frame = null

      const dt =
        lastTime === 0 ? 0.016 : Math.min((time - lastTime) / 1000, 0.05)

      lastTime = time
      elapsed += dt

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation =
        mode === 'embers' ? 'lighter' : 'source-over'

      for (const particle of particles) {
        let alpha: number
        let drawX = particle.x

        if (mode === 'embers') {
          alpha = updateEmber(particle, dt)
          drawX +=
            Math.sin(elapsed * particle.swaySpeed + particle.phase) *
            particle.sway *
            scale
        } else {
          alpha = updateFirefly(particle, dt)
        }

        if (alpha <= 0.01) {
          continue
        }

        const spriteSize = particle.size * (mode === 'embers' ? 7 : 9) * scale

        context.globalAlpha = Math.min(1, alpha)
        context.drawImage(
          sprites[particle.color],
          drawX - spriteSize / 2,
          particle.y - spriteSize / 2,
          spriteSize,
          spriteSize
        )
      }

      context.globalAlpha = 1

      schedule()
    }

    const shouldRun = (): boolean =>
      isPageVisible && isIntersecting && !reducedMotionQuery.matches

    const schedule = (): void => {
      if (frame === null && shouldRun()) {
        frame = requestAnimationFrame(tick)
      }
    }

    const stop = (): void => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }

      lastTime = 0
    }

    const applyRunState = (): void => {
      if (shouldRun()) {
        schedule()
      } else {
        stop()

        if (reducedMotionQuery.matches) {
          context.clearRect(0, 0, width, height)
        }
      }
    }

    resize()
    applyRunState()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      applyRunState()
    })

    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver((entries) => {
      isIntersecting = entries[0]?.isIntersecting ?? true
      applyRunState()
    })

    intersectionObserver.observe(canvas)

    const handleVisibilityChange = (): void => {
      isPageVisible = document.visibilityState === 'visible'
      applyRunState()
    }

    const handleMediaChange = (): void => {
      buildParticles()
      applyRunState()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    reducedMotionQuery.addEventListener('change', handleMediaChange)
    smallScreenQuery.addEventListener('change', handleMediaChange)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      reducedMotionQuery.removeEventListener('change', handleMediaChange)
      smallScreenQuery.removeEventListener('change', handleMediaChange)
    }
  }, [mode, count, scale])

  return (
    <canvas
      aria-hidden
      className={`pointer-events-none ${className}`}
      ref={canvasRef}
    />
  )
}
