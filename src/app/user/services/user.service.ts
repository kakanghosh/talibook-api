import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/app/hashing/services/hashing.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    try {
      user.password = await this.hashingService.generateHash(user.password);
      return this.userRepository.save(user);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (user) {
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      return this.userRepository.save(user);
    }
    return null;
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    return new Promise((resolve, reject) => {
      try {
        if (user) {
          this.userRepository.remove(user);
          resolve(true);
        }
        reject(false);
      } catch (e) {
        reject(false);
      }
    });
  }
}
