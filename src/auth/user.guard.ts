import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ProfileRole } from 'src/graphql';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (
      (req.body?.variables?.id || req.body?.variables?.profile) &&
      req.user.id
    ) {
      if (req.user.role == ProfileRole.ADMIN) return true;

      if (
        req.body?.variables?.id == req.user.id ||
        req.body?.variables?.profile == req.user.id
      ) {
        return true;
      }
    } else {
      return false;
    }

    return false;
  }
}
