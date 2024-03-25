import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const jwt_token = authHeader.split(' ')[1];
    const bearer = authHeader.split(' ')[0];

    if (bearer !== 'Bearer' || !jwt_token) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    const secret = process.env.JWT_SECRET;
    const user = this.jwtService.verify(jwt_token, { secret: secret });

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
