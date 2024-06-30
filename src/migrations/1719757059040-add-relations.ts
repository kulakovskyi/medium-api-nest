import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelations1719757059040 implements MigrationInterface {
  name = 'addRelations1719757059040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" ADD "authorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]::text[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]`,
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "authorId"`);
  }
}
