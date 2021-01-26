import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
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
  @Delete(DISTRIBUTORS.DELETE)
  async deleteDistributor(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.distributorService.deleteDistributor(user, id);
  }
}
