import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

type RequestWithUser = {
  user?: Record<string, unknown>;
};

export const User = createParamDecorator(
  (filter?: string, context?: ExecutionContext) => {
    const request = context?.switchToHttp().getRequest<RequestWithUser>();
    const user = request?.user;

    if (!user) {
      return undefined;
    }

    if (filter) {
      const value = user[filter];

      if (value === undefined) {
        throw new NotFoundException(`User ${filter} not found`);
      }

      return value;
    }

    return user;
  },
);
