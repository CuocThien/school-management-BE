import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getUserAgent } from 'libs/utils';

export const HttpAccountId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.data.id;
  },
);

export const HttpReqUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.data.id;
  },
);

export const HttpOrganizationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.data.organizationId;
  },
);

export const HttpUserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return getUserAgent(request, true);
  },
);
