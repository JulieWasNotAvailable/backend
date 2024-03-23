import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    //to retrieve user and verify password
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user; //...result to srtip the password property from the user object
      return result;
    }

    return null;
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

  async login(user: any) {
    // const user = await this.usersService.findByUsername(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
