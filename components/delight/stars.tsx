import type { CSSProperties, ReactElement } from 'react'

interface Star {
  delay: string
  duration: string
  left: string
  size: number
  top: string
}

// Hardcoded positions keep server and client renders identical.
const stars: Star[] = [
  { delay: '0s', duration: '4.2s', left: '11%', size: 2, top: '9%' },
  { delay: '1.3s', duration: '5.1s', left: '23%', size: 1.5, top: '18%' },
  { delay: '2.8s', duration: '4.6s', left: '36%', size: 2, top: '7%' },
  { delay: '0.7s', duration: '5.8s', left: '52%', size: 1.5, top: '14%' },
  { delay: '3.4s', duration: '4.4s', left: '64%', size: 2.5, top: '22%' },
  { delay: '1.9s', duration: '5.4s', left: '77%', size: 1.5, top: '10%' },
  { delay: '4.1s', duration: '4.8s', left: '86%', size: 2, top: '17%' },
  { delay: '2.2s', duration: '6.2s', left: '94%', size: 1.5, top: '30%' },
  { delay: '5s', duration: '5.6s', left: '44%', size: 1.5, top: '31%' }
]

export default function Stars(): ReactElement {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star, index) => {
        const style: CSSProperties = {
          animationDelay: star.delay,
          animationDuration: star.duration,
          height: star.size,
          left: star.left,
          top: star.top,
          width: star.size
        }

        return (
          <span
            className="star"
            key={index}
            style={style}
          />
        )
      })}
    </div>
  )
}
