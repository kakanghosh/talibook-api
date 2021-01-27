import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Distributor } from 'src/app/distributor/entities/distributor.entity';
import { Repository } from 'typeorm';
import { CreateShopDto } from '../dtos/create-shop.dto';
import { Shop } from '../entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  async createShop(distributor: Distributor, createShopDto: CreateShopDto) {
    const shopFromDB = await this.findShopByDistributorAndName(
      distributor,
      createShopDto.name,
    );
    if (shopFromDB) {
      throw new UnprocessableEntityException(
        `Shop exist with name ${createShopDto.name}`,
      );
    }
    const shop = this.shopRepository.create(createShopDto);
    shop.distributor = distributor;
    return await this.shopRepository.save(shop);
  }

  async findShopByDistributorAndName(distributor: Distributor, name: string) {
    return await this.shopRepository.findOne({
      where: { distributor: distributor, name: name },
    });
  }

  async findAllShopOfDistributor(distributor: Distributor) {
    return await this.shopRepository.find({
      where: { distributor: distributor },
    });
  }

  async findOneShopOfDistributor(distributor: Distributor, shopId: number) {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId, distributor: distributor },
    });
    if (!shop) {
      throw new UnprocessableEntityException(`Shop not found by ${shopId}`);
    }
    return shop;
  }

  async deleteOneShopOfDistributor(distributor: Distributor, shopId: number) {
    const shop = await this.findOneShopOfDistributor(distributor, shopId);
    const deleteResult = await this.shopRepository.delete(shop.id);
    return deleteResult.affected > 0;
  }
}
