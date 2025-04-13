import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744564103411 implements MigrationInterface {
    name = ' Migration1744564103411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "name"`);
    }

}
