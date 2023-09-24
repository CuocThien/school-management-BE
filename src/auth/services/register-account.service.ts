import { Injectable } from '@nestjs/common';
import { RegisterAccountBodyDTO } from 'types';

@Injectable()
export class RegisterAccountService {
  public registerAccount(body: RegisterAccountBodyDTO) {
    return;
  }
}
