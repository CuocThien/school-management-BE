import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getToken, getUserAgent } from 'libs/utils';
import { RenewAccessTokenService } from 'src/auth/services';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly renewAccessTokenService: RenewAccessTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = getToken(req);
    const userAgent = getUserAgent(req);
    const newToken = await this.renewAccessTokenService.renewAccessToken({
      accountId: payload.accountId,
      token,
      userAgent,
      expiredTime: payload.exp,
    });
    if (newToken.status != 200) {
      throw new UnauthorizedException(newToken.message);
    }
    return newToken;
  }
}
