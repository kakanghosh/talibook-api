import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { API, SHOPS } from '../app.routes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { Request, Response } from 'express';
import { DistributorService } from '../distributor/services/distributor.service';
import { CreateShopDto } from './dtos/create-shop.dto';
import { ShopService } from './services/shop.service';

@Controller(API.BASE_ROUTE)
@UseGuards(JwtAuthGuard)
export class ShopController {
  constructor(
    private readonly distributorService: DistributorService,
    private readonly shopService: ShopService,
  ) {}

  @Post(SHOPS.CREATE)
  async createShop(
    @Param('id') distributorId: number,
    @Body() createShopDto: CreateShopDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const distributor = await this.distributorService.getDistributor(
      user,
      distributorId,
    );
    return await this.shopService.createShop(distributor, createShopDto);
  }

  @Get(SHOPS.GET_ALL)
  async getAllShop(@Param('id') distributorId: number, @Req() req: Request) {
    const distributor = await this.distributorService.getDistributor(
      req.user as User,
      distributorId,
    );
    return await this.shopService.findAllShopOfDistributor(distributor);
  }

  @Get(SHOPS.GET_ONE)
  async getOneShop(
    @Param('id') distributorId: number,
    @Param('shopId') shopId: number,
    @Req() req: Request,
  ) {
    const distributor = await this.distributorService.getDistributor(
      req.user as User,
      distributorId,
    );
    return await this.shopService.findOneShopOfDistributor(distributor, shopId);
  }

  @Delete(SHOPS.DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneShop(
    @Param('id') distributorId: number,
    @Param('shopId') shopId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const distributor = await this.distributorService.getDistributor(
      req.user as User,
      distributorId,
    );
    const result = await this.shopService.deleteOneShopOfDistributor(
      distributor,
      shopId,
    );
    if (!result) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    } else {
      res.send();
    }
  }
}
