import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745848808508 implements MigrationInterface {
    name = ' Migration1745848808508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "description"`);
    }

}
