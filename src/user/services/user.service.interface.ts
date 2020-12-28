import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;

  findAll(): Promise<User[]>;

  findOne(id: number): Promise<User>;

  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;

  remove(id: number): Promise<boolean>;
}
