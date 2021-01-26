import { MigrationInterface, QueryRunner } from 'typeorm';

export class createShopsTable1611693387841 implements MigrationInterface {
  name = 'createShopsTable1611693387841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shops" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "distributor_id" integer, CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shops" ADD CONSTRAINT "FK_db878a529b64e636fa22536eb0e" FOREIGN KEY ("distributor_id") REFERENCES "distributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shops" DROP CONSTRAINT "FK_db878a529b64e636fa22536eb0e"`,
    );
    await queryRunner.query(`DROP TABLE "shops"`);
  }
}
