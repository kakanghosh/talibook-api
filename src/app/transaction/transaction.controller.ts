import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { API, TRANSACTIONS } from '../app.routes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Distributor } from '../distributor/entities/distributor.entity';
import { DistributorService } from '../distributor/services/distributor.service';
import { ShopService } from '../shop/services/shop.service';
import { User } from '../user/entities/user.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionService } from './services/transaction.service';

@Controller(API.BASE_ROUTE)
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(
    private readonly distributorService: DistributorService,
    private readonly shopService: ShopService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post(TRANSACTIONS.CREATE_TRANSACTION)
  async createTransaction(
    @Param('id') distributorId: number,
    @Param('shopId') shopId: number,
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    const { shop } = await this.resolveDistributorAndShop(
      request.user as User,
      distributorId,
      shopId,
    );
    return await this.transactionService.createTransaction(
      shop,
      createTransactionDto,
    );
  }

  @Get(TRANSACTIONS.GET_ALL_TRANSACTION)
  async getAllTransaction(
    @Param('id') distributorId: number,
    @Param('shopId') shopId: number,
    @Req() request: Request,
  ) {
    const { shop } = await this.resolveDistributorAndShop(
      request.user as User,
      distributorId,
      shopId,
    );
    const transactions = await this.transactionService.findAllTransaction(shop);
    const {
      totalDeposite,
      totalPurchase,
    } = this.transactionService.calculateDepositeAndPurchase(transactions);
    return { totalDeposite, totalPurchase, transactions };
  }

  async resolveDistributorAndShop(
    user: User,
    distributorId: number,
    shopId: number,
  ) {
    const distributor = await this.distributorService.getDistributor(
      user,
      distributorId,
    );
    const shop = await this.shopService.findOneShopOfDistributor(
      distributor,
      shopId,
    );
    return { distributor, shop };
  }
}
