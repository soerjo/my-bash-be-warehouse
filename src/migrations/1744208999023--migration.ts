import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744208999023 implements MigrationInterface {
    name = ' Migration1744208999023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse"."warehouse" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_d5d5470e55d4238b1239e9f154b" UNIQUE ("name"), CONSTRAINT "UQ_dcbf22551ec3827f234e532a08b" UNIQUE ("code"), CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse"."unit" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "unit_id" integer NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "warehouse_id" integer, "description" character varying, CONSTRAINT "UQ_8893a61126ad0507e5d6a63ecb3" UNIQUE ("unit_id"), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse"."category" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "category_id" integer NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying, "bank_id" integer, "warehouse_id" integer, "unit_id" integer, CONSTRAINT "UQ_cc7f32b7ab33c70b9e715afae84" UNIQUE ("category_id"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse"."transaction-store" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "last_transaction_id" character varying NOT NULL, "amount" numeric NOT NULL, "warehouse_id" integer, "category_id" integer, CONSTRAINT "PK_11c8f4a59ec5388339706bb9336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse"."transaction_type" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "transaction_type_id" integer NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_fa15cdd9f6ea232ff4f50c0970c" UNIQUE ("transaction_type_id"), CONSTRAINT "PK_e4e15bcea926d360cfeea703c36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse"."transaction_status" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "transaction_status_id" integer NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_1739c61830b989f5265983ac618" UNIQUE ("transaction_status_id"), CONSTRAINT "PK_05fbbdf6bc1db819f47975c8c0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse"."store" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "price" numeric NOT NULL, "bank_id" integer, "warehouse_id" integer, "category_id" integer, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "last_transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "last_transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "price_per_unit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "total_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_type_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "transaction_status_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "bank_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."unit" ADD CONSTRAINT "FK_a155aeddf9d93cc487bc3992979" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."category" ADD CONSTRAINT "FK_c5a39e53027687d3ef705f8d031" FOREIGN KEY ("unit_id") REFERENCES "warehouse"."unit"("unit_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."category" ADD CONSTRAINT "FK_6b29fec38d82d32daa678638198" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_283cc4152b859af70cb62daf3fd" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_c40e3b59a22ff7554aaf5e319cc" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_87379f56e095f996ee141dd7519" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_292be604670c99ccc48130d790c" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_7d8479598218ee5e903c2a6efed" FOREIGN KEY ("transaction_status_id") REFERENCES "warehouse"."transaction_status"("transaction_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_e068a47a2560ab6b61e97d7beca" FOREIGN KEY ("transaction_type_id") REFERENCES "warehouse"."transaction_type"("transaction_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_e068a47a2560ab6b61e97d7beca"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_7d8479598218ee5e903c2a6efed"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_292be604670c99ccc48130d790c"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_87379f56e095f996ee141dd7519"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_c40e3b59a22ff7554aaf5e319cc"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_283cc4152b859af70cb62daf3fd"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."category" DROP CONSTRAINT "FK_6b29fec38d82d32daa678638198"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."category" DROP CONSTRAINT "FK_c5a39e53027687d3ef705f8d031"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."unit" DROP CONSTRAINT "FK_a155aeddf9d93cc487bc3992979"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "bank_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_status_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_type_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "price_per_unit"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "last_transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "last_transaction_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "warehouse"."store"`);
        await queryRunner.query(`DROP TABLE "warehouse"."transaction_status"`);
        await queryRunner.query(`DROP TABLE "warehouse"."transaction_type"`);
        await queryRunner.query(`DROP TABLE "warehouse"."transaction-store"`);
        await queryRunner.query(`DROP TABLE "warehouse"."category"`);
        await queryRunner.query(`DROP TABLE "warehouse"."unit"`);
        await queryRunner.query(`DROP TABLE "warehouse"."warehouse"`);
    }

}
