import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/users/user.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: unknown }>();
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) return false;

    const token = authorization.split(' ')[1];

    const { valid, decoded } = await this.authService.validateToken(token);

    if (!valid || !decoded || decoded.sub === undefined)
      throw new UnauthorizedException('Invalid token');

    const user = await this.userService.show(Number(decoded.sub));

    if (!user) return false;

    request.user = user;

    return true;
  }
}
