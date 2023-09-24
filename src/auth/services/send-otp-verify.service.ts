import { Injectable } from '@nestjs/common';
import { SendOtpBodyDTO } from 'types';

@Injectable()
export class SendOtpVerifyService {
  public sendOtpVerify(body: SendOtpBodyDTO) {
    return;
  }
}
