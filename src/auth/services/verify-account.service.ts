import { Injectable } from '@nestjs/common';
import { VerifyAccountQueryDTO } from 'types';

@Injectable()
export class VerifyAccountService {
  public verifyAccount(query: VerifyAccountQueryDTO) {
    return;
  }
}
