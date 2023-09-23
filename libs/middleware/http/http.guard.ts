import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateRequestId } from 'libs/utils';

@Injectable()
export class HttpGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this._getToken(request);
    const requestId = generateRequestId();
    const jwtTokenService = new JwtService({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const payload = jwtTokenService.decode(token) || {};
    request['accountId'] = !token ? '00' : payload['accountId'];
    request['organizationId'] = !token ? '00' : payload['organizationId'];
    request['requestId'] = requestId;
    return true;
  }

  private _getToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
}
