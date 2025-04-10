import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744223993211 implements MigrationInterface {
    name = ' Migration1744223993211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "message" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."transaction-store" ALTER COLUMN "message" SET NOT NULL`);
    }

}
