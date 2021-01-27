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
import { Request, Response } from 'express';
import { DistributorService } from './services/distributor.service';
import { API, DISTRIBUTORS } from '../app.routes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { CreateDistributorDto } from './dtos/create-distributor.dto';

@Controller(API.BASE_ROUTE)
export class DistributorController {
  constructor(private readonly distributorService: DistributorService) {}

  @UseGuards(JwtAuthGuard)
  @Post(DISTRIBUTORS.CREATE)
  async createDistributor(
    @Body() createDistributorDto: CreateDistributorDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const distrubutor = await this.distributorService.createDistributor(
      user,
      createDistributorDto,
    );
    return distrubutor;
  }

  @UseGuards(JwtAuthGuard)
  @Get(DISTRIBUTORS.GET_ALL)
  async getDistributors(@Req() req: Request) {
    const user = req.user as User;
    return this.distributorService.getDistributors(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(DISTRIBUTORS.GET_ONE)
  async getDistributor(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.distributorService.getDistributor(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(DISTRIBUTORS.DELETE)
  async deleteDistributor(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as User;
    const result = await this.distributorService.deleteDistributor(user, id);
    if (!result) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    } else {
      res.send();
    }
  }
}
