import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { API, USERS } from '../app.routes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Controller(API.BASE_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(USERS.CREATE)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(USERS.GET_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(USERS.GET_ONE)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(USERS.PROFILE)
  getProfile(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    if (user.id === id) return user;
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(USERS.UPDATE)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(USERS.DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deleted = await this.userService.remove(id);
      res.json(deleted);
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json();
    }
  }
}
