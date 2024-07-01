import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly tagList: string[];
}

export class CreateArticleBody {
  @ApiProperty({ type: CreateArticleDto })
  article: CreateArticleDto;
}
