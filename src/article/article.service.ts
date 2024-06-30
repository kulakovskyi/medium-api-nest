import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import {
  ArticleResponseInterface,
  ArticlesResponseInterface,
} from './types/article-response.interface';
import slugify from 'slugify';
import { QueryArticlesInterface } from './types/query-articles.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getArticles(
    currentUserId: number,
    query: QueryArticlesInterface,
  ): Promise<ArticlesResponseInterface> {
    const queryBuilder = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');
    const articlesCount = await queryBuilder.getCount();
    if (query.tag) {
      queryBuilder.andWhere(':tag = ANY(articles.tagList)', {
        tag: query.tag,
      });
    }

    if (query.favorited) {
      const user = await this.userRepository.findOne(
        {
          username: query.favorited,
        },
        { relations: ['favorites'] },
      );
      if (!user) {
        return { articles: [], articlesCount: 0 };
      }

      const ids = user.favorites.map((fav) => fav.id);
      if (ids.length > 0) {
        queryBuilder.andWhere('articles.id IN (:...ids)', { ids });
      } else {
        queryBuilder.andWhere('1=0');
      }
    }

    if (query.author) {
      const author = await this.userRepository.findOne({
        username: query.author,
      });
      if (author) {
        queryBuilder.andWhere('author.id = :id', {
          id: author.id,
        });
      } else {
        return { articles: [], articlesCount: 0 };
      }
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    let favoriteIds: number[] = [];
    if (currentUserId) {
      const currentUser = await this.userRepository.findOne(currentUserId, {
        relations: ['favorites'],
      });
      favoriteIds = currentUser.favorites.map((fav) => fav.id);
    }

    queryBuilder.orderBy('articles.createdAt', 'DESC');

    const articles = await queryBuilder.getMany();
    const articlesWithFavorites = articles.map((article) => {
      const favorited = favoriteIds.includes(article.id);
      return { ...article, favorited };
    });

    return { articles: articlesWithFavorites, articlesCount };
  }

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    article.author = currentUser;
    article.slug = this.getSlug(createArticleDto.title);
    return await this.articleRepository.save(article);
  }

  async getArticle(slug: string): Promise<ArticleResponseInterface> {
    const article = await this.articleRepository.findOne({ slug });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return this.buildArticleResponse(article);
  }

  async deleteArticle(
    slug: string,
    currentUserId: number,
  ): Promise<{ success: string }> {
    const article = await this.articleRepository.findOne({ slug });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    if (article.author.id !== currentUserId) {
      throw new HttpException(
        'You are not an author of this article',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.articleRepository.remove(article);
    return { success: 'Article delete' };
  }

  async updateArticle(
    slug: string,
    currentUserId: number,
    updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleRepository.findOne({ slug });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    if (article.author.id !== currentUserId) {
      throw new HttpException(
        'You are not an author of this article',
        HttpStatus.FORBIDDEN,
      );
    }
    Object.assign(article, updateArticleDto);
    await this.articleRepository.save(article);
    return this.buildArticleResponse(article);
  }

  async favoriteArticle(
    currentUserId: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ slug });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userRepository.findOne(currentUserId, {
      relations: ['favorites'],
    });
    const isNotFavorited =
      user.favorites.findIndex((fav) => fav.id === article.id) === -1;
    if (isNotFavorited) {
      user.favorites.push(article);
      article.favoritesCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }
    return article;
  }

  async unFavoriteArticle(
    currentUserId: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ slug });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userRepository.findOne(currentUserId, {
      relations: ['favorites'],
    });
    const articleIndex = user.favorites.findIndex(
      (fav) => fav.id === article.id,
    );
    const isFavorited = articleIndex !== -1;
    if (isFavorited) {
      user.favorites.splice(articleIndex, 1);
      article.favoritesCount--;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }
    return article;
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      (Math.random() * Math.pow(36, 6)).toString(36)
    );
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article: article };
  }
}
