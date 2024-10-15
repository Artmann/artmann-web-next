import Link from 'next/link'
import React, { ReactElement } from 'react'

interface HeaderProps {
  color?: boolean
}

export default function Header({ color = true }: HeaderProps): ReactElement {
  return (
    <div
      className={`
        w-full
        box-border
        px-8 py-2 md:py-3
        fixed top-0
        z-20
        text-white
      `}
      style={{
        backdropFilter: 'blur(24px)',
        backgroundColor: color ? 'rgba(113, 34,47, 0.95)' : 'transparent'
      }}
    >
      <div
        className={`
          w-full
          flex items-center
          max-w-4xl
          mx-auto
        `}
      >
        <div className="flex-1">
          <Link
            className="text-sm font-semibold"
            href="/"
            style={{ fontFamily: 'Poppins' }}
          >
            Christoffer Artmann
          </Link>
        </div>
        <nav
          className={`
            flex gap-4
            font-medium
            text-xs
          `}
        >
          <div>
            <Link
              className="hover:underline"
              href="/"
            >
              Posts
            </Link>
          </div>
          <div>
            <Link
              className="hover:underline"
              href="/projects"
            >
              Projects
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
