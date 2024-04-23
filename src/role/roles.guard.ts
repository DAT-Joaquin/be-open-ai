import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride(Role, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return role === user.role;
  }
}
