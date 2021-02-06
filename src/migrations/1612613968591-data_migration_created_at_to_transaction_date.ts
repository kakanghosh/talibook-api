import { MigrationInterface, QueryRunner } from 'typeorm';

export class dataMigrationCreatedAtToTransactionDate1612613968591
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE transactions SET transaction_date = created_at WHERE id > 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE transactions SET transaction_date = now() WHERE id > 0`,
    );
  }
}
