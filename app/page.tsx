import { loadArticles } from '../lib/article-service/article-loader'
import { HomeContent } from './_components/home-content'

export default async function HomePage() {
  const articles = await loadArticles()

  return <HomeContent articles={articles} />
}
