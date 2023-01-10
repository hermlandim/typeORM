import { MigrationInterface, QueryRunner } from "typeorm";

export class includeDefaultTypeFieldUser1671356432508 implements MigrationInterface {
    name = 'includeDefaultTypeFieldUser1671356432508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "type" SET DEFAULT 'FrontEnd'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
