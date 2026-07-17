import type { ReactElement } from 'react'

interface CampfireProps {
  className?: string
  size?: number
  variant?: 'footer' | 'inline'
}

export default function Campfire({
  className = '',
  size = 56,
  variant = 'footer'
}: CampfireProps): ReactElement {
  const logColors =
    variant === 'footer' ? ['#8a5a3b', '#6f4530'] : ['#4a2f22', '#3a241a']

  return (
    <svg
      aria-hidden
      className={className}
      height={size}
      viewBox="0 0 64 56"
      width={(size / 56) * 64}
    >
      <ellipse
        className="campfire-glow"
        cx="32"
        cy="44"
        fill="#f97316"
        rx="22"
        ry="10"
      />

      <circle
        className="campfire-spark"
        cx="26"
        cy="24"
        fill="#fbbf24"
        r="1"
      />
      <circle
        className="campfire-spark"
        cx="39"
        cy="28"
        fill="#fcd34d"
        r="0.8"
        style={{ animationDelay: '-1.4s' }}
      />

      <g className="campfire-flame-outer">
        <path
          d="M32 12 C38 22 43 30 43 38 C43 45 38 49 32 49 C26 49 21 45 21 38 C21 30 26 22 32 12 Z"
          fill="#f59e0b"
        />
      </g>
      <g className="campfire-flame-mid">
        <path
          d="M32 20 C36 27 39.5 32 39.5 38 C39.5 43.5 36 46.5 32 46.5 C28 46.5 24.5 43.5 24.5 38 C24.5 32 28 27 32 20 Z"
          fill="#f97316"
        />
      </g>
      <g className="campfire-flame-inner">
        <path
          d="M32 29 C34.5 33.5 36 36.5 36 40 C36 43.5 34 45 32 45 C30 45 28 43.5 28 40 C28 36.5 29.5 33.5 32 29 Z"
          fill="#fde68a"
        />
      </g>

      <rect
        fill={logColors[0]}
        height="5"
        rx="2.5"
        transform="rotate(14 32 48.5)"
        width="26"
        x="19"
        y="46"
      />
      <rect
        fill={logColors[1]}
        height="5"
        rx="2.5"
        transform="rotate(-14 32 48.5)"
        width="26"
        x="19"
        y="46"
      />
    </svg>
  )
}
