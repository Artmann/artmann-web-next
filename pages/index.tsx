import { GetStaticProps } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import { ReactElement } from 'react';

import Container from '../components/container';
import { Article, articleService } from '../lib/article-service';
import { loadArticles } from '../lib/article-service/article-loader';
import { parseDate } from '../lib/date';

interface HomeProps {
  articles: Article[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = await loadArticles();

  return {
    props: {
      articles
    }
  }
};

function FeaturedArticle({ article } : { article: Article } ): ReactElement {
  return (
    <div className="md:mx-4 pb-8 flex flex-row items-start border-b-2 border-pink-500 mb-8 md:border-none md:flex-col md:items-center">
      <div className="border-gray-300 shadow-lg w-48 h-32 flex-none bg-center bg-cover mr-4 md:w-84 md:h-64 md:mr-0 md:mb-8" style={{ backgroundImage: `url(${ article.imageUrl })` }}></div>

      <div>
        <Link href={ articleService.getPath(article) }>
          <h2 className="cursor-pointer text-lg m-0">
            { article.title }
          </h2>
        </Link>
      </div>
    </div>
  );
}

function ArticleItem({ article } : { article: Article } ): ReactElement {
  return (
    <div className="py-8 flex flex-row items-start border-b border-gray-300">
      <div className="border-gray-300 shadow-lg w-48 h-32 flex-none bg-center bg-cover mr-4" style={{ backgroundImage: `url(${ article.imageUrl })` }}></div>

      <div>
        <Link href={ articleService.getPath(article) }>
          <h2 className="cursor-pointer text-lg m-0">
            { article.title }
          </h2>
        </Link>
        <p className="py-2 text-sm text-gray-600">
          { parseDate(article.publishedAt).format('MMMM DD, YYYY') }
        </p>
      </div>
    </div>
  );
}

export default function Home({ articles }: HomeProps): ReactElement {
  const [ firstArticle, secondArticle, ...restOfArticles ] = articles;

  return (
    <Container>

      <Head>
        <title>Christoffer Artmann</title>
      </Head>

      <div className="flex flex-col justify-center mb-8 md:border-b-2 md:border-pink-500 md:flex-row">
        { [ firstArticle, secondArticle ].map(article => <FeaturedArticle article={ article } key={ article.title } />) }
      </div>

      <div>
        { restOfArticles.map(article => <ArticleItem article={ article } key={ article.title } />) }
      </div>

    </Container>
  );
}
