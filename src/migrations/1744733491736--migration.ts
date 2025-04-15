import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744733491736 implements MigrationInterface {
    name = ' Migration1744733491736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP COLUMN "fee_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD "fee_id" integer`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927" FOREIGN KEY ("fee_id") REFERENCES "warehouse"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
