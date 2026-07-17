import type { ReactElement } from 'react'

interface RangerBadgeProps {
  className?: string
  size?: number
  variant?: 'footer' | 'light'
}

export default function RangerBadge({
  className = '',
  size = 96,
  variant = 'footer'
}: RangerBadgeProps): ReactElement {
  const color =
    variant === 'footer'
      ? 'rgba(255, 240, 220, 0.75)'
      : 'rgba(113, 34, 47, 0.55)'
  const idPrefix = `ranger-badge-${variant}`

  return (
    <svg
      aria-hidden
      className={className}
      height={size}
      viewBox="0 0 96 96"
      width={size}
    >
      <defs>
        {/* Full circles so the arc text never clips at a path endpoint. */}
        <path
          d="M 15 48 A 33 33 0 0 1 81 48 A 33 33 0 0 1 15 48"
          id={`${idPrefix}-top`}
        />
        <path
          d="M 16 48 A 32 32 0 0 0 80 48 A 32 32 0 0 0 16 48"
          id={`${idPrefix}-bottom`}
        />
      </defs>

      <circle
        cx="48"
        cy="48"
        fill="none"
        r="45"
        stroke={color}
        strokeDasharray="2 3"
        strokeWidth="1.5"
      />
      <circle
        cx="48"
        cy="48"
        fill="none"
        r="22"
        stroke={color}
        strokeWidth="1"
      />

      <text
        fill={color}
        fontFamily="var(--font-poppins), sans-serif"
        fontSize="6.5"
        fontWeight="600"
        letterSpacing="1.2"
      >
        <textPath
          href={`#${idPrefix}-top`}
          startOffset="25%"
          textAnchor="middle"
        >
          CHRISTOFFER ARTMANN
        </textPath>
      </text>
      <text
        fill={color}
        fontFamily="var(--font-poppins), sans-serif"
        fontSize="6.5"
        fontWeight="600"
        letterSpacing="1.2"
      >
        <textPath
          href={`#${idPrefix}-bottom`}
          startOffset="25%"
          textAnchor="middle"
        >
          BARCELONA · LOOKOUT
        </textPath>
      </text>

      {/* Two peaks and a moon */}
      <path
        d="M36 56 L44 43 L48.5 49.5 L52 45 L60 56 Z"
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle
        cx="56"
        cy="40"
        fill="none"
        r="2.5"
        stroke={color}
        strokeWidth="1.2"
      />
    </svg>
  )
}
