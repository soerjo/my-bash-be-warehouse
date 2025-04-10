import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744307696776 implements MigrationInterface {
    name = ' Migration1744307696776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."warehouse" ADD "bank_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ALTER COLUMN "price" TYPE numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "price_per_unit" TYPE numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "price_per_unit" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "amount" TYPE numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "amount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "total_price" TYPE numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "total_price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" ALTER COLUMN "amount" TYPE numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" ALTER COLUMN "amount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" ALTER COLUMN "amount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" ALTER COLUMN "amount" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "total_price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "total_price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "amount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "amount" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "price_per_unit" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "price_per_unit" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "warehouse"."warehouse" DROP COLUMN "bank_id"`);
    }

}
