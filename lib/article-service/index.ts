import { paramCase } from 'change-case';

export enum ArticleStatus {
  Draft = 'Draft',
  Published = 'Published'
}

export interface Article {
  blurb: string;
  imageUrl: string;
  publishedAt: string;
  status: ArticleStatus;
  tags: string[];
  text: string;
  title: string;
}

class ArticleService {
  getPath(article: Article): string {
    const slug = this.getSlug(article);

    return `/articles/${ slug }`;
  }

  getSlug(article): string {
    const slug = paramCase(article.title);

    return slug;
  }
}

export const articleService = new ArticleService();
