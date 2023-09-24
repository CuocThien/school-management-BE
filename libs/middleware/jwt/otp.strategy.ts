import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoginOtpService } from 'src/auth/services';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy, 'otp') {
  constructor(private readonly loginOtpService: LoginOtpService) {
    super({
      usernameField: 'phone',
      passwordField: 'otp',
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<any> {
    const payload: any = req.body;
    const { phone, otp, type } = payload || {};
    return await this.loginOtpService.loginOtp({ phone, otp, type });
  }
}
