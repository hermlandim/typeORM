import { MigrationInterface, QueryRunner } from "typeorm";

export class createAdress1671485685099 implements MigrationInterface {
    name = 'createAdress1671485685099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" SERIAL NOT NULL, "street" character varying(50) NOT NULL, "number" character varying(5) NOT NULL, "zip_code" character varying(8) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "informations" character varying(50), CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "adressId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d668d60e6cbf1966636e32f4ef8" UNIQUE ("adressId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d668d60e6cbf1966636e32f4ef8" FOREIGN KEY ("adressId") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d668d60e6cbf1966636e32f4ef8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d668d60e6cbf1966636e32f4ef8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adressId"`);
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
