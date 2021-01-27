import { TransformationType } from 'class-transformer/enums';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsEnum(TransformationType)
  type: TransactionType;
}
