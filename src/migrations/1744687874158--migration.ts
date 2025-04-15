import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744687874158 implements MigrationInterface {
    name = ' Migration1744687874158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."warehouse" ADD "trx_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."warehouse" DROP COLUMN "trx_id"`);
    }

}
