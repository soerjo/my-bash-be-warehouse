import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744859297250 implements MigrationInterface {
    name = ' Migration1744859297250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ADD "last_logs_id" character varying`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ADD "store_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" DROP COLUMN "last_logs_id"`);
    }

}
