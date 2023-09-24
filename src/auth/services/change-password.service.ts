import { Injectable } from '@nestjs/common';
import { ChangePasswordBodyDTO } from 'types';

@Injectable()
export class ChangePasswordService {
  public changePassword(body: ChangePasswordBodyDTO, accountId: number) {
    return;
  }
}
