import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744223947865 implements MigrationInterface {
    name = ' Migration1744223947865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP CONSTRAINT "FK_283cc4152b859af70cb62daf3fd"`);
        await queryRunner.query(`CREATE TABLE "warehouse"."transaction-warehouse" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "last_transaction_id" character varying NOT NULL, "amount" numeric NOT NULL, "warehouse_id" integer, "category_id" integer, CONSTRAINT "PK_f91c65f9a3f2642b2f1003a016e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "last_transaction_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" ADD CONSTRAINT "FK_c1dfaac56eb92ddbb966e9c8de5" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" ADD CONSTRAINT "FK_e3546e7ff551dbc96abf79ddfd2" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" DROP CONSTRAINT "FK_e3546e7ff551dbc96abf79ddfd2"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-warehouse" DROP CONSTRAINT "FK_c1dfaac56eb92ddbb966e9c8de5"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD "last_transaction_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "warehouse"."transaction-warehouse"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ADD CONSTRAINT "FK_283cc4152b859af70cb62daf3fd" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
