import dayjs from 'dayjs';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { Article, ArticleStatus } from '.';

export async function loadArticles(): Promise<Article[]> {
  const aritcleBasePath = join(process.cwd(), 'articles');
  const filenames = await fs.readdir(aritcleBasePath);
  const files = await Promise.all(
    filenames.map(filename => fs.readFile(join(aritcleBasePath, filename), 'utf-8'))
  );
  const documents = files.map(data => matter(data));

  const articles = documents.map((document): Article => ({
    blurb: document.data.blurb,
    imageUrl: document.data.imageUrl,
    publishedAt: dayjs(document.data.publishedAt).format('YYYY-MM-DD'),
    status: document.data.status === 'Published' ? ArticleStatus.Published : ArticleStatus.Draft,
    tags: document.data.tags.split(',').map((tag: string) => tag.trim()),
    text: document.content,
    title: document.data.title
  }));

  return articles
    .filter(article => article.status === ArticleStatus.Published)
    //.sort((a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix());
}
