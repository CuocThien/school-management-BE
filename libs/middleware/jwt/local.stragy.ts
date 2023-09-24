import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoginService } from 'src/auth/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({ passReqToCallback: true });
  }

  async validate(req: Request): Promise<any> {
    const payload: any = req.body;
    const { username, password, type } = payload || {};
    return await this.loginService.login({ username, password, type });
  }
}
