import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFollow1719826378734 implements MigrationInterface {
    name = 'CreateFollow1719826378734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
