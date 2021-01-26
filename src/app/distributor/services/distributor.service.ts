import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDistributorDto } from '../dtos/create-distributor.dto';
import { Distributor } from '../entities/distributor.entity';

@Injectable()
export class DistributorService {
  constructor(
    @InjectRepository(Distributor)
    private readonly distributorRepostory: Repository<Distributor>,
  ) {}

  async createDistributor(user: User, createDistributor: CreateDistributorDto) {
    const distributorFromDB = await this.getDistributorByUserAndName(
      user,
      createDistributor.name,
    );
    if (distributorFromDB) {
      throw new UnprocessableEntityException(
        `Distributor exist with name ${createDistributor.name}`,
      );
    }
    const distributor = this.distributorRepostory.create(createDistributor);
    distributor.user = user;
    return this.distributorRepostory.save(distributor);
  }

  async getDistributors(user: User) {
    const distributors = this.distributorRepostory.find({
      where: { user: user },
    });
    return distributors;
  }

  async getDistributor(user: User, id: number) {
    const distributor = await this.distributorRepostory.findOne({
      where: { id: id, user: user },
    });
    if (!distributor) {
      throw new NotFoundException('Distributor not found');
    }
    return distributor;
  }

  async deleteDistributor(user: User, id: number) {
    const distributor = await this.getDistributor(user, id);
    if (distributor) {
      return this.distributorRepostory.delete(distributor);
    }
    return null;
  }

  async getDistributorByUserAndName(user: User, name: string) {
    const distributor = this.distributorRepostory.findOne({
      where: { name: name, user: user },
    });
    return distributor;
  }
}
