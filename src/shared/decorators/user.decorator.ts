/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;

    if (filter) {
      if (!user[filter]) {
        throw new NotFoundException(`User ${filter} not found`);
      }
      return user[filter];
    }

    return user;
  },
);
