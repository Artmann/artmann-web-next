import { DiscussionEmbed } from 'disqus-react'
import hljs from 'highlight.js'
import marked from 'marked'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import Container from '../../components/container'
import Header from '../../components/header'
import { articleService, Article } from '../../lib/article-service'
import { loadArticles } from '../../lib/article-service/article-loader'
import { parseDate } from '../../lib/date'

interface ArticlePageProps {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await loadArticles()
  const paths = articles
    .map((article) => articleService.getSlug(article))
    .map((slug) => ({
      params: {
        slug
      }
    }))

  return {
    paths,
    fallback: false
  }
}

function renderMarkdown(markdown: string): string {
  const highlight = (code: string, lang: string, callback: Function) => {
    const { value } = hljs.highlight(lang || 'ts', code)

    return value
  }

  return marked(markdown, {
    highlight
  })
}

export default function ArticlePage({
  articles
}: ArticlePageProps): ReactElement {
  const router = useRouter()
  const { slug } = router.query
  const article = articles.find((a) => articleService.getSlug(a) === slug)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.analytics && article) {
      window.analytics.funnel('activation')
    }
  }, [article])

  const disqusConfig = {
    identifier: articleService.getSlug(article),
    title: article.title,
    url: `https://www.artmann.co${router.asPath}`
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta
          name="description"
          content={article.blurb}
        />

        <meta
          property="og:title"
          content={article.title}
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:description"
          content={article.blurb}
        />
        <meta
          property="og:image"
          content={`https://www.artmann.co${article.imageUrl}`}
        />

        <meta
          property="twitter:title"
          content={article.title}
        />
        <meta
          property="twitter:card"
          content="summary"
        />
        <meta
          property="twitter:description"
          content={article.blurb}
        />
        <meta
          property="twitter:image"
          content={`https://www.artmann.co${article.imageUrl}`}
        />
      </Head>

      <Header />

      <Container>
        <article className="w-full text-gray-800 leading-loose pt-8 space-y-8">
          <header className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {article.title}
            </h1>

            <p className="text-lg md:text-xl">{article.blurb}</p>

            <p className="mb-8 text-sm text-gray-600">
              {parseDate(article.publishedAt).format('MMMM DD, YYYY')}
            </p>
          </header>

          <img
            alt={article.title}
            className="w-full h-auto border-gray-300 shadow-lg overflow-x-hidden break-words"
            src={article.imageUrl}
          />

          <div
            className="article-content text-lg leading-relaxed text-gray-800 pb-16 md:pb-32"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.text) }}
          ></div>
        </article>

        <div>
          <DiscussionEmbed
            shortname="artmann"
            config={disqusConfig}
          />
        </div>
      </Container>
    </>
  )
}
