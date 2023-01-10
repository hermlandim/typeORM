import { MigrationInterface, QueryRunner } from "typeorm";

export class createTechnologyToProject1672075869642 implements MigrationInterface {
    name = 'createTechnologyToProject1672075869642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technology_projects" ("id" SERIAL NOT NULL, "added_in" date NOT NULL, "projectId" integer, "technologyId" integer, CONSTRAINT "PK_1b1b830f2378a086b98f142c3af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technologies" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "technology_projects" ADD CONSTRAINT "FK_663efc5ace8f31449394b0ceabc" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_projects" ADD CONSTRAINT "FK_5270c44f35b1d280ed8f2175675" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technology_projects" DROP CONSTRAINT "FK_5270c44f35b1d280ed8f2175675"`);
        await queryRunner.query(`ALTER TABLE "technology_projects" DROP CONSTRAINT "FK_663efc5ace8f31449394b0ceabc"`);
        await queryRunner.query(`DROP TABLE "technologies"`);
        await queryRunner.query(`DROP TABLE "technology_projects"`);
    }

}
