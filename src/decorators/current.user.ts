import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (key && request.currentUser) {
      return request.currentUser[key] || '';
    } else {
      return request.currentUser;
    }
  },
);
