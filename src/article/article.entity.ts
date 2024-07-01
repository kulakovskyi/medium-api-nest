import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  slug: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ default: '' })
  @ApiProperty()
  description: string;

  @Column({ default: '' })
  @ApiProperty()
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;

  @BeforeUpdate()
  @ApiProperty()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  @ApiProperty()
  tagList: string[];

  @Column({ default: 0 })
  @ApiProperty()
  favoritesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  @ApiProperty({ type: () => UserEntity })
  author: UserEntity;
}
