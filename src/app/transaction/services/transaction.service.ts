import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Between, Repository } from 'typeorm';
import { Transaction, TransactionType } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    shop: Shop,
    createTransactionDto: CreateTransactionDto,
  ) {
    const transaction = this.transactionRepository.create(createTransactionDto);
    transaction.shop = shop;
    return await this.transactionRepository.save(transaction);
  }

  async findAllTransaction(shop: Shop) {
    const transactions = await this.transactionRepository.find({
      where: { shop: shop },
      order: {
        createdAt: 'DESC',
      },
    });
    return transactions;
  }

  async findAllTransactionFilterByDate(
    shop: Shop,
    startDate: Date,
    endDate: Date,
  ) {
    const transactions = await this.transactionRepository.find({
      where: { shop: shop, createdAt: Between(startDate, endDate) },
      order: {
        createdAt: 'DESC',
      },
    });
    return transactions;
  }

  async findDepositeTransaction(shop: Shop) {
    const transactions = await this.transactionRepository.find({
      where: { shop: shop, type: TransactionType.DEPOSITE },
    });
    return transactions;
  }

  async findPurchaseTransaction(shop: Shop) {
    const transactions = await this.transactionRepository.find({
      where: { shop: shop, type: TransactionType.PURCHASE },
    });
    return transactions;
  }

  calculateDepositeAndPurchase(transactions: Transaction[]) {
    const purchases = transactions.filter(
      (transaction) => transaction.type == TransactionType.PURCHASE,
    );
    const deposites = transactions.filter(
      (transaction) => transaction.type == TransactionType.DEPOSITE,
    );
    const totalPurchase = purchases.reduce(
      (preValue, purchase) => preValue + purchase.amount,
      0,
    );
    const totalDeposite = deposites.reduce(
      (preValue, deposite) => preValue + deposite.amount,
      0,
    );
    return { totalDeposite, totalPurchase };
  }

  async getTransactionByShopAndID(shop: Shop, transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { shop: shop, id: transactionId },
    });
    if (!transaction) {
      throw new UnprocessableEntityException(
        `Transaction not found by ${transactionId}`,
      );
    }
    return transaction;
  }

  async deleteTransaction(transaction: Transaction) {
    const result = await this.transactionRepository.delete(transaction.id);
    return result.affected > 0;
  }
}
