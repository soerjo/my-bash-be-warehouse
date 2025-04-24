import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745507238011 implements MigrationInterface {
    name = ' Migration1745507238011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "store_buy_price" numeric(18,4) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "store_buy_price"`);
    }

}
