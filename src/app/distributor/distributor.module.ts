import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributorController } from './distributor.controller';
import { Distributor } from './entities/distributor.entity';
import { DistributorService } from './services/distributor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor])],
  controllers: [DistributorController],
  providers: [DistributorService],
})
export class DistributorModule {}
