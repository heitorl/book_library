import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695074766873 implements MigrationInterface {
    name = 'InitialMigration1695074766873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "description" text, "available" boolean NOT NULL DEFAULT true, "borrowedBy" character varying, "startDate" TIMESTAMP, "endDate" TIMESTAMP, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
