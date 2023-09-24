import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutService {
  public logout(accessToken: string, accountId: number) {
    return;
  }
}
