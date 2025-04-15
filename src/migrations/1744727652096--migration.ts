import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744727652096 implements MigrationInterface {
    name = ' Migration1744727652096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_87379f56e095f996ee141dd7519"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "price" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "fee_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "store_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "percentage" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_87379f56e095f996ee141dd7519" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927" FOREIGN KEY ("fee_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_87379f56e095f996ee141dd7519"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "percentage"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "fee_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "price" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_87379f56e095f996ee141dd7519" FOREIGN KEY ("category_id") REFERENCES "warehouse"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
