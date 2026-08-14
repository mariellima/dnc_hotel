import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requeridRules = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRules) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: Role } }>();
    const { user } = request;

    if (!user) return false;

    const isRoleMatch = requeridRules.some((role) => user.role === role);

    return isRoleMatch;
  }
}
