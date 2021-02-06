import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { API, TRANSACTIONS } from '../app.routes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
    const transaction = await this.transactionService.createTransaction(
      shop,
      createTransactionDto,
    );
    const transactions = await this.transactionService.findAllTransaction(shop);
    const {
      totalDeposite,
      totalPurchase,
    } = this.transactionService.calculateDepositeAndPurchase(transactions);
    return { totalDeposite, totalPurchase, transaction };
  }

  @Get(TRANSACTIONS.GET_ALL_TRANSACTION)
  async getAllTransaction(
    @Param('id') distributorId: number,
    @Param('shopId') shopId: number,
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('timeZoneOffset') timeZoneOffset: number,
    @Req() request: Request,
  ) {
    const { shop } = await this.resolveDistributorAndShop(
      request.user as User,
      distributorId,
      shopId,
    );
    let transactions = [];
    if (month && year && timeZoneOffset) {
      const { startDate, endDate } = getDateRangeFromMonthYearAndOffset(
        month,
        year,
        timeZoneOffset,
      );
      transactions = await this.transactionService.findAllTransactionFilterByDate(
        shop,
        startDate,
        endDate,
      );
    } else {
      transactions = await this.transactionService.findAllTransaction(shop);
    }
    const {
      totalDeposite,
      totalPurchase,
    } = this.transactionService.calculateDepositeAndPurchase(transactions);
    return { totalDeposite, totalPurchase, transactions };
  }

  @Delete(TRANSACTIONS.DELETE_ONE_TRANSACTION)
  async deleteOneTransaction(
    @Param('id') distributorId: number,
    @Param('shopId') shopId: number,
    @Param('transactionId') transactionId: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { shop } = await this.resolveDistributorAndShop(
      request.user as User,
      distributorId,
      shopId,
    );
    const transaction = await this.transactionService.getTransactionByShopAndID(
      shop,
      transactionId,
    );
    const result = await this.transactionService.deleteTransaction(transaction);
    if (!result) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    } else {
      const transactions = await this.transactionService.findAllTransaction(
        shop,
      );
      const {
        totalDeposite,
        totalPurchase,
      } = this.transactionService.calculateDepositeAndPurchase(transactions);
      response.send({ totalPurchase, totalDeposite });
    }
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

function getDateRangeFromMonthYearAndOffset(
  month: number,
  year: number,
  timeZoneOffset: number,
) {
  const startDate = new Date(year, month - 1, 1);
  startDate.setHours(startDate.getHours() + timeZoneOffset / 60);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  endDate.setHours(endDate.getHours() + timeZoneOffset / 60);
  return { startDate, endDate };
}
