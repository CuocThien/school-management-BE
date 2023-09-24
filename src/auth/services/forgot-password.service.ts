import { Injectable } from '@nestjs/common';
import { ForgotPasswordBodyDTO } from 'types';

@Injectable()
export class ForgotPasswordService {
  public forgotPassword(body: ForgotPasswordBodyDTO) {
    return;
  }
}
