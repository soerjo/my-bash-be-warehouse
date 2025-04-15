import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744733836716 implements MigrationInterface {
    name = ' Migration1744733836716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" DROP CONSTRAINT "FK_4ab766c526ccb684c23d59dc3a2"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "fee_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927" FOREIGN KEY ("fee_id") REFERENCES "warehouse"."fee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "fee_id"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" ADD CONSTRAINT "FK_4ab766c526ccb684c23d59dc3a2" FOREIGN KEY ("store_id") REFERENCES "warehouse"."store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
