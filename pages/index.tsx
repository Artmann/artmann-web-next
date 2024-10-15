import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useCallback, useEffect, useState } from 'react'

import Header from '../components/header'
import { Article, articleService } from '../lib/article-service'
import { loadArticles } from '../lib/article-service/article-loader'

interface HomeProps {
  articles: Article[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = await loadArticles()

  return {
    props: {
      articles
    }
  }
}

export default function Home({ articles }: HomeProps): ReactElement {
  const [firstArticle, ...restOfArticles] = articles

  const [backgroundPositionX, setBackgroundPositionX] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollSpeed = 0.25

    setBackgroundPositionX(-window.scrollY * scrollSpeed)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <Head>
        <title>Christoffer Artmann</title>
      </Head>

      <Header color={false} />

      <div className="relative">
        <div
          className={`
            fixed inset-0
            bg-[url('/images/parallax-forest-tiled.png')]
            bg-fixed bg-cover
          `}
          style={{
            backgroundPositionX
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: 'rgba(148, 33, 66, 0.5)',
              backdropFilter: 'blur(20px)'
            }}
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
        </div>
      </div>
    </>
  )
}

function ArticleCard({ article }: { article: Article }): ReactElement {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-8 lg:gap-12 items-start">
      <img
        alt={article.title}
        className="w-full max-w-[18rem] aspect-[4/3] shadow-lg"
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
