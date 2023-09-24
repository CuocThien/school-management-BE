import { Injectable } from '@nestjs/common';
import { SendOtpBodyDTO } from 'types';

@Injectable()
export class SendOtpLoginService {
  public sendOtpLogin(body: SendOtpBodyDTO) {
    return;
  }
}
