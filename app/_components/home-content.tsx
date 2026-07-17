'use client'

import Link from 'next/link'
import { useEffect, useRef, type ReactElement } from 'react'

import ParticleField from '../../components/delight/particle-field'
import Stars from '../../components/delight/stars'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { articleService, type Article } from '../../lib/article-service'

interface HomeContentProps {
  articles: Article[]
}

export function HomeContent({ articles }: HomeContentProps): ReactElement {
  const [firstArticle, ...restOfArticles] = articles

  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const scrollSpeed = 0.25
    let frame: number | null = null

    const handleScroll = (): void => {
      if (frame !== null) {
        return
      }

      frame = requestAnimationFrame(() => {
        frame = null

        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundPositionX = `${-window.scrollY * scrollSpeed}px`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (frame !== null) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <>
      <Header color={false} />

      <div className="relative">
        <div
          ref={backgroundRef}
          className={`
            fixed inset-0
            bg-[url('/images/parallax-forest-tiled.png')]
            bg-fixed bg-cover
          `}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(148, 33, 66, 0.5)',
              backdropFilter: 'blur(20px)'
            }}
          />

          {/* Decorative layers must come after the blur overlay so they render crisp. */}
          <div className="hero-haze" />
          <Stars />
          <ParticleField
            className="absolute inset-0 h-full w-full"
            mode="embers"
          />
        </div>
        <div className="relative z-10 min-h-screen text-white">
          <section
            className={`
              w-full h-screen
              flex justify-center items-center
              p-6
            `}
          >
            <ArticleCard article={firstArticle} />
          </section>

          <section className="w-full box-border p-6 pb-32 space-y-16 md:space-y-24">
            {restOfArticles.map((article) => (
              <div
                key={article.title}
                className="w-full max-w-4xl mx-auto"
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </section>

          <Footer />
        </div>
      </div>
    </>
  )
}

function ArticleCard({ article }: { article: Article }): ReactElement {
  return (
    <div className="group flex flex-col md:flex-row gap-2 md:gap-8 lg:gap-12 items-start">
      <img
        alt={article.title}
        className={`
          w-full max-w-[18rem] md:max-w-[24rem] aspect-[4/3] shadow-lg
          brightness-75 saturate-[0.85]
          transition duration-300
          group-hover:brightness-110 group-hover:saturate-110
          group-hover:shadow-[0_0_24px_rgba(255,180,107,0.35)]
        `}
        loading="lazy"
        src={article.imageUrl}
      />

      <div className="flex flex-shrink-0 flex-col gap-2 max-w-md">
        <h2
          className={`
            font-bold text-xl md:text-3xl text-white
            hover:text-gray-200
            m-0
          `}
        >
          <Link href={articleService.getPath(article)}>{article.title}</Link>
        </h2>

        <p className="md:text-lg">{article.blurb}</p>
      </div>
    </div>
  )
}
