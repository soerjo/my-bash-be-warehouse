import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744727791195 implements MigrationInterface {
    name = ' Migration1744727791195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse"."fee" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "store_id" integer, "percentage" numeric(18,4) NOT NULL DEFAULT '0', "bank_id" integer, "warehouse_id" integer, CONSTRAINT "PK_ee7e51cc563615bc60c2b234635" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "percentage"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" ADD CONSTRAINT "FK_769384708b9351b153172ef9ff0" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" DROP CONSTRAINT "FK_769384708b9351b153172ef9ff0"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "percentage" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "store_id" integer`);
        await queryRunner.query(`DROP TABLE "warehouse"."fee"`);
    }

}
