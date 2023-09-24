import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { getToken, JWT_TOKEN_TYPE } from 'libs/utils';
import { GetProfileService, ValidateTokenService } from 'src/auth/services';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(
    private readonly validateTokenService: ValidateTokenService,
    private readonly getProfileService: GetProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = getToken(req);
    const [validateTokenRes, profileRes] = await Promise.all([
      this.validateTokenService.validateToken({
        accountId: payload.accountId,
        token,
        type: JWT_TOKEN_TYPE.ACCESS_TOKEN,
      }),
      this.getProfileService.getProfile(payload.accountId),
    ]);
    if (validateTokenRes.status != 200) {
      throw new UnauthorizedException(validateTokenRes.message);
    }
    if (profileRes.status != 200) {
      throw new UnauthorizedException(profileRes.message);
    }
    return profileRes;
  }
}
