import { Injectable } from '@nestjs/common';
import { response } from 'libs/utils';
import { LoginOtpBodyDTO } from 'types';

@Injectable()
export class LoginOtpService {
  public loginOtp(body: LoginOtpBodyDTO) {
    return response(200, 'SUCCESSFULLY', body);
  }
}
