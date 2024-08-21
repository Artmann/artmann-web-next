import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

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

  return (
    <>
      <Head>
        <title>Christoffer Artmann</title>
      </Head>

      <Header color={false} />

      <div
        className="text-white"
        style={{ background: '#71222f' }}
      >
        <section
          className={`
            w-full h-screen
            bg-center bg-cover
            shadow-md
          `}
          style={{ backgroundImage: `url(${firstArticle.imageUrl})` }}
        >
          <div
            className="w-full h-full flex justify-center items-center p-8 border-box"
            style={{
              backgroundColor: 'rgba(148, 33, 66, 0.7)',
              backdropFilter: 'blur(24px)'
            }}
          >
            <div
              className={`
                flex flex-col gap-4 md:flex-row md:gap-12
              `}
              style={{
                color: 'rgba(255, 255, 255, 0.88)'
              }}
            >
              <img
                alt={firstArticle.title}
                className="w-full aspect-[4/3] max-w-md shadow-md lg:max-w-lg"
                src={firstArticle.imageUrl}
              />
              <div className="flex flex-col gap-4 max-w-md">
                <h2
                  className={`
                    font-bold text-xl md:text-3xl text-white
                    hover:text-gray-200
                  `}
                >
                  <Link href={articleService.getPath(firstArticle)}>
                    {firstArticle.title}
                  </Link>
                </h2>
                <p className="text-sm md:text-lg">{firstArticle.blurb}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 py-16 md:px-32">
          <div className="flex flex-col gap-16">
            {restOfArticles.map((article) => (
              <div
                className={`
                    flex flex-col md:flex-row
                    items-center md:items-start
                    gap-4 md:gap-12
                  `}
                key={article.title}
              >
                <img
                  alt={article.title}
                  className="w-full aspect-[4/3] max-w-md shadow-md"
                  src={article.imageUrl}
                />
                <div className="flex flex-col gap-4 max-w-md">
                  <h2
                    className={`
                        font-bold text-xl md:text-3xl text-white
                        hover:text-gray-200
                        m-0 block
                      `}
                  >
                    <Link href={articleService.getPath(article)}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-sm md:text-lg">{article.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
