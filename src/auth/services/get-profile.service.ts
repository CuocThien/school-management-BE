import { Injectable } from '@nestjs/common';
import { response } from 'libs/utils';

@Injectable()
export class GetProfileService {
  public getProfile(accountId: number) {
    return response(200, 'SUCCESSFULLY', accountId);
  }
}
