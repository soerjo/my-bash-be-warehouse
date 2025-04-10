import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744223816450 implements MigrationInterface {
    name = ' Migration1744223816450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_7d8479598218ee5e903c2a6efed"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_e068a47a2560ab6b61e97d7beca"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_283cc4152b859af70cb62daf3fd"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "price_per_unit"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_type_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_status_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "bank_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "last_transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "last_transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "price_per_unit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "total_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_type_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_status_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "bank_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "store_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_283cc4152b859af70cb62daf3fd" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_7d8479598218ee5e903c2a6efed" FOREIGN KEY ("transaction_status_id") REFERENCES "warehouse"."transaction_status"("transaction_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_e068a47a2560ab6b61e97d7beca" FOREIGN KEY ("transaction_type_id") REFERENCES "warehouse"."transaction_type"("transaction_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_357632082408c0d4dfcc24c8e67" FOREIGN KEY ("store_id") REFERENCES "warehouse"."store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_357632082408c0d4dfcc24c8e67"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_e068a47a2560ab6b61e97d7beca"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_7d8479598218ee5e903c2a6efed"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_283cc4152b859af70cb62daf3fd"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "bank_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_status_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_type_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "price_per_unit"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "last_transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "last_transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "bank_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_status_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_type_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "total_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "price_per_unit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_283cc4152b859af70cb62daf3fd" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_e068a47a2560ab6b61e97d7beca" FOREIGN KEY ("transaction_type_id") REFERENCES "warehouse"."transaction_type"("transaction_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_7d8479598218ee5e903c2a6efed" FOREIGN KEY ("transaction_status_id") REFERENCES "warehouse"."transaction_status"("transaction_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
