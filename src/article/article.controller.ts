import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArticleBody, CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import {
  ArticleResponseInterface,
  ArticlesResponseInterface,
} from './types/article-response.interface';
import { QueryArticlesInterface } from './types/query-articles.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserBody } from '../user/types/user-response.interface';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'Return all articles',
    type: ArticlesResponseInterface,
  })
  @ApiResponse({ status: 200, description: 'Return all articles' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @ApiQuery({ name: 'favorited', required: false, type: String })
  async getArticles(
    @User('id') currentUserId: number,
    @Query() query: QueryArticlesInterface,
  ): Promise<ArticlesResponseInterface> {
    return this.articleService.getArticles(currentUserId, query);
  }

  @Post()
  @ApiOperation({ summary: 'Create article' })
  @ApiBody({ type: CreateArticleBody })
  @ApiResponse({
    status: 200,
    description: 'article',
    type: ArticleResponseInterface,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createArticle(
    @User() currentUser: UserEntity,
    @Body('article')
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get feed articles' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return feed articles',
    type: ArticlesResponseInterface,
  })
  @ApiBearerAuth()
  async getFeed(
    @User('id') currentUserId: number,
    @Query() query: QueryArticlesInterface,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getFeed(currentUserId, query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get an article by slug' })
  @ApiResponse({
    status: 200,
    description: 'Return the article',
    type: ArticleResponseInterface,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async getArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    return this.articleService.getArticle(slug);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete an article by slug' })
  @ApiResponse({
    status: 200,
    description: 'Return success message',
    type: 'object',
    schema: {
      properties: {
        success: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<{ success: string }> {
    return this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update an article by slug' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated article',
    type: ArticleResponseInterface,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    return this.articleService.updateArticle(
      slug,
      currentUserId,
      updateArticleDto,
    );
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Favorite an article by slug' })
  @ApiResponse({
    status: 200,
    description: 'Return the favorited article',
    type: ArticleResponseInterface,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async favoriteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.favoriteArticle(
      currentUserId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Unfavorite an article by slug' })
  @ApiResponse({
    status: 200,
    description: 'Return the unfavorited article',
    type: ArticleResponseInterface,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async unFavoriteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.unFavoriteArticle(
      currentUserId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
