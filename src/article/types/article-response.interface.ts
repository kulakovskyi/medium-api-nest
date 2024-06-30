import { ArticleEntity } from '../article.entity';

export interface ArticleResponseInterface {
  article: ArticleEntity;
}

export interface ArticlesResponseInterface {
  articles: ArticleType[];
  articlesCount: number;
}

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
