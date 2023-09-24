import { Injectable } from '@nestjs/common';
import { ResendVerifyAccountBodyDTO } from 'types';

@Injectable()
export class SendSettingPasswordService {
  public sendSettingPassword(body: ResendVerifyAccountBodyDTO) {
    return;
  }
}
