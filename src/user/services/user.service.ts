import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
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
