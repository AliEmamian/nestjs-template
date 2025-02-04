import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMediaImagePost1738598353198 implements MigrationInterface {
    name = 'AddMediaImagePost1738598353198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "post" ADD "media" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "media"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
    }

}
