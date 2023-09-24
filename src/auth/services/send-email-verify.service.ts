import { Injectable } from '@nestjs/common';
import { ResendVerifyAccountBodyDTO } from 'types';

@Injectable()
export class SendEmailVerifyService {
  public sendEmailVerify(body: ResendVerifyAccountBodyDTO) {
    return;
  }
}
