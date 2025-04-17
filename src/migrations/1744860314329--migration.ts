import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744860314329 implements MigrationInterface {
    name = ' Migration1744860314329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "price" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "warehouse"."store-logs" ALTER COLUMN "price" SET NOT NULL`);
    }

}
