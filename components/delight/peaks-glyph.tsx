import type { ReactElement } from 'react'

interface PeaksGlyphProps {
  className?: string
  size?: number
}

// Two peaks flanked by conifers — shares its look with the ranger badge
// center glyph and the article divider.
export default function PeaksGlyph({
  className = '',
  size = 28
}: PeaksGlyphProps): ReactElement {
  return (
    <svg
      aria-hidden
      className={className}
      height={size}
      viewBox="0 0 48 28"
      width={(size / 28) * 48}
    >
      <path
        d="M2 24 L7 15 L10 19 L12 24 Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M12 24 L22 6 L28 15 L32 9 L40 24 Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M38 24 L42 16 L46 24 Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  )
}
