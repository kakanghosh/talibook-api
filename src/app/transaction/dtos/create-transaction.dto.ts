import { TransformationType } from 'class-transformer/enums';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsEnum(TransformationType)
  type: TransactionType;

  @IsDateString()
  @IsOptional()
  transactionDate?: Date;

  @IsNumber()
  timeZoneOffset: number;
}
