import { Injectable } from '@nestjs/common';
import { response } from 'libs/utils';

@Injectable()
export class ValidateTokenService {
  public validateToken(body) {
    return response(200, 'SUCCESFULLY', body);
  }
}
