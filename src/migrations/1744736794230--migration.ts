import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744736794230 implements MigrationInterface {
    name = ' Migration1744736794230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927" FOREIGN KEY ("fee_id") REFERENCES "warehouse"."fee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store" DROP CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927"`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store" ADD CONSTRAINT "FK_95daf7b5e5a9ec06f944aa85927" FOREIGN KEY ("fee_id") REFERENCES "warehouse"."fee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
