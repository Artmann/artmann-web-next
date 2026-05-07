'use client'

import { DiscussionEmbed } from 'disqus-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { analytics } from 'roaarrr-browser'

interface ArticleClientEffectsProps {
  slug: string
  title: string
}

export function ArticleClientEffects({
  slug,
  title
}: ArticleClientEffectsProps) {
  const pathname = usePathname()

  useEffect(() => {
    analytics.funnel('activation')
  }, [])

  const disqusConfig = {
    identifier: slug,
    title,
    url: `https://www.artmann.co${pathname ?? `/articles/${slug}`}`
  }

  return (
    <div style={{ color: 'rgb(55, 65, 81)', backgroundColor: 'rgb(255, 255, 255)' }}>
      <DiscussionEmbed
        shortname="artmann"
        config={disqusConfig}
      />
    </div>
  )
}
