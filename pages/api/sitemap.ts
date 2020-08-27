import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';

import { loadArticles } from '../../lib/article-service/article-loader';
import { articleService } from '../../lib/article-service';

export default async(request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const articles = await loadArticles();

  const stream = new SitemapStream({
    hostname: 'https://www.artmann.co',
  });

  stream.write({
    url: '/',
  });

  stream.write({
    url: '/projects',
  });

  articles.forEach(article => {
    stream.write({
      url: articleService.getPath(article),
      lastmod: moment(article.publishedAt, 'DD-MM-YYYY').toISOString()
    });
  });

  stream.end();

  const sitemap = await streamToPromise(stream);

  response.setHeader('Content-Type', 'text/xml');

  response.write(sitemap.toString());

  response.end();
}
