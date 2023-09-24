import { Injectable } from '@nestjs/common';
import { VerifyPhoneBodyDTO } from 'types';

@Injectable()
export class VerifyPhoneService {
  public verifyPhone(body: VerifyPhoneBodyDTO) {
    return;
  }
}
