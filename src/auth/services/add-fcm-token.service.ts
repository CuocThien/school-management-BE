import { Injectable } from '@nestjs/common';
import { AddFcmTokenBodyDTO } from 'types';

@Injectable()
export class AddFcmTokenService {
  public addFcmToken(
    body: AddFcmTokenBodyDTO,
    accessToken: string,
    accountId: number,
  ) {
    return;
  }
}
