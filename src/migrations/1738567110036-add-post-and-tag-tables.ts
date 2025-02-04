import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostAndTagTables1738567110036 implements MigrationInterface {
    name = 'AddPostAndTagTables1738567110036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" jsonb, "description" jsonb, "type" character varying, "tags" character varying array, "filter" jsonb, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fa" character varying, "en" character varying, "ar" character varying, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
