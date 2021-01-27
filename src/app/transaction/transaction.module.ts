import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { DistributorModule } from '../distributor/distributor.module';
import { TransactionController } from './transaction.controller';
import { ShopModule } from '../shop/shop.module';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    DistributorModule,
    ShopModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
