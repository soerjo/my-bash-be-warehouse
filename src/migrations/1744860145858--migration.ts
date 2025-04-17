import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744860145858 implements MigrationInterface {
    name = ' Migration1744860145858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "fee" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "fee" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "fee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "fee" SET NOT NULL`);
    }

}
