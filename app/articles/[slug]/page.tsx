import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

import Container from '../../../components/container'
import Header from '../../../components/header'
import { articleService } from '../../../lib/article-service'
import { loadArticles } from '../../../lib/article-service/article-loader'
import { renderMarkdown } from '../../../lib/article-service/render-markdown'
import { parseDate } from '../../../lib/date'
import { ArticleClientEffects } from './article-client-effects'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const articles = await loadArticles()

  return articles.map((article) => ({
    slug: articleService.getSlug(article)
  }))
}

export async function generateMetadata(props: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await props.params
  const articles = await loadArticles()
  const article = articles.find((a) => articleService.getSlug(a) === slug)

  if (!article) {
    return {}
  }

  const url = `https://www.artmann.co/articles/${slug}`
  const image = `https://www.artmann.co${article.imageUrl}`

  return {
    title: article.title,
    description: article.blurb,
    openGraph: {
      title: article.title,
      description: article.blurb,
      type: 'website',
      url,
      images: [image]
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.blurb,
      images: [image]
    }
  }
}

export default async function ArticlePage(props: {
  params: Params
}): Promise<ReactElement> {
  const { slug } = await props.params
  const articles = await loadArticles()
  const article = articles.find((a) => articleService.getSlug(a) === slug)

  if (!article) {
    notFound()
  }

  const html = renderMarkdown(article.text)

  return (
    <>
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
            className="article-content text-base leading-relaxed text-gray-900 pb-16 md:pb-32"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </article>

        <ArticleClientEffects
          slug={slug}
          title={article.title}
        />
      </Container>
    </>
  )
}
