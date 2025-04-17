import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744859122193 implements MigrationInterface {
    name = ' Migration1744859122193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse"."store-logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL DEFAULT '0', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "price" numeric(18,4) NOT NULL DEFAULT '0', "fee" numeric(18,4) NOT NULL DEFAULT '0', "bank_id" integer, "warehouse_id" integer, "category_id" integer, CONSTRAINT "PK_221187701305a97c60384243255" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ADD CONSTRAINT "FK_d8235a3ba42ccf95873ac3ea68b" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ADD CONSTRAINT "FK_fe5f09e350771db6791156c7277" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" DROP CONSTRAINT "FK_fe5f09e350771db6791156c7277"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" DROP CONSTRAINT "FK_d8235a3ba42ccf95873ac3ea68b"`);
        await queryRunner.query(`DROP TABLE "warehouse"."store-logs"`);
    }

}
