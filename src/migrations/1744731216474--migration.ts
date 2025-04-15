import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744731216474 implements MigrationInterface {
    name = ' Migration1744731216474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" ADD CONSTRAINT "FK_4ab766c526ccb684c23d59dc3a2" FOREIGN KEY ("store_id") REFERENCES "warehouse"."store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."fee" DROP CONSTRAINT "FK_4ab766c526ccb684c23d59dc3a2"`);
    }

}
