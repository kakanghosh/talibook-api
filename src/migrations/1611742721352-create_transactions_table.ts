import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTransactionsTable1611742721352
  implements MigrationInterface {
  name = 'createTransactionsTable1611742721352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "transactions_type_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "type" "transactions_type_enum" NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "shop_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_7f5a45a0bf69df462237ce6ae55" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_7f5a45a0bf69df462237ce6ae55"`,
    );
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "transactions_type_enum"`);
  }
}
