import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);
      return {
        token: this.jwtService.sign({ id: userData.userId }),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.userId }),
    };
  }
}
