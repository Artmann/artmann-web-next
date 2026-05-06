import { SitemapStream, streamToPromise } from 'sitemap'

import { articleService } from '../../../lib/article-service'
import { loadArticles } from '../../../lib/article-service/article-loader'
import { parseDate } from '../../../lib/date'

export async function GET(): Promise<Response> {
  const articles = await loadArticles()

  const stream = new SitemapStream({
    hostname: 'https://www.artmann.co'
  })

  stream.write({ url: '/' })
  stream.write({ url: '/projects' })

  articles.forEach((article) => {
    stream.write({
      url: articleService.getPath(article),
      lastmod: parseDate(article.publishedAt).toISOString()
    })
  })

  stream.end()

  const sitemap = await streamToPromise(stream)

  return new Response(sitemap.toString(), {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
