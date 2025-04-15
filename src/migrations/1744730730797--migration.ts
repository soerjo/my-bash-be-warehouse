import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744730730797 implements MigrationInterface {
    name = ' Migration1744730730797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" ALTER COLUMN "percentage" TYPE numeric(18,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" ALTER COLUMN "percentage" TYPE numeric(18,4)`);
    }

}
