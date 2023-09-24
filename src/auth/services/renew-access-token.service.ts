import { Injectable } from '@nestjs/common';
import { response } from 'libs/utils';

@Injectable()
export class RenewAccessTokenService {
  public renewAccessToken(body) {
    return response(200, 'SUCCESFULLY', body);
  }
}
