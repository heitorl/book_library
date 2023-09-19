import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695091865893 implements MigrationInterface {
    name = 'InitialMigration1695091865893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "description" text DEFAULT '', "available" boolean NOT NULL DEFAULT true, "borrowedBy" character varying, "startDate" date, "endDate" date, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
