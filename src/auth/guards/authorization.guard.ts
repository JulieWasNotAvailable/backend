// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AuthorizationGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     console.log('INSIDE AUTHORIZATION GUARD');

//     const userRole = request.user.role;

//     const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
//       context.getClass(),
//       context.getHandler(),
//     ]);
//     //The required roles are:  [ 'admin' ] - required roles are array like this
//     if (!requiredRoles) {
//       return true;
//     }

//     const { user } = context.switchToHttp().getRequest();
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }
