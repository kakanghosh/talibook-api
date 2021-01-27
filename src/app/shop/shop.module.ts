import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './services/shop.service';
import { Shop } from './entities/shop.entity';
import { DistributorModule } from '../distributor/distributor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), DistributorModule],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
