import { MigrationInterface, QueryRunner } from 'typeorm';

export class article1719756403646 implements MigrationInterface {
  name = 'article1719756403646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "slug" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]::text[]`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP COLUMN "favoritesCount"`,
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "slug"`);
  }
}
