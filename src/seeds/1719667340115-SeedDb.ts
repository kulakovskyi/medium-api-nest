import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1719667340115 implements MigrationInterface {
  name = 'SeedDb1719667340115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags ("name") VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      `INSERT INTO users ("username", "email", "password") VALUES ('foo','foo@gmail.com', '123')`,
    );
  }

  public async down(): Promise<void> {}
}
