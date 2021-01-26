import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/app/hashing/services/hashing.service';
import { User } from 'src/app/user/entities/user.entity';
import { UserService } from 'src/app/user/services/user.service';
import { JwtAccesstoken } from '../dtos/jwt.token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (user && this.hashingService.matchHash(password, user.password)) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  login({ email, id }: User): JwtAccesstoken {
    const payload = { email, sub: id };
    return new JwtAccesstoken(this.jwtService.sign(payload));
  }
}
