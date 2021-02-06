import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedTransactionDateColumn1612613198119
  implements MigrationInterface {
  name = 'addedTransactionDateColumn1612613198119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "transaction_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "transaction_date"`,
    );
  }
}
