import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/user.entity';

export class ArticleType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  tagList: string[];

  @ApiProperty()
  favoritesCount: number;

  @ApiProperty({ type: () => UserEntity })
  author: UserEntity;
}

export class ArticleResponseInterface {
  @ApiProperty({ type: () => ArticleType })
  article: ArticleType;
}

export class ArticlesResponseInterface {
  @ApiProperty({ type: () => [ArticleType] })
  articles: ArticleType[];
  @ApiProperty()
  articlesCount: number;
}
