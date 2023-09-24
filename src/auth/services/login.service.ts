import { Injectable } from '@nestjs/common';
import { response } from 'libs/utils';
import { LoginBodyDTO } from 'types';

@Injectable()
export class LoginService {
  public login(body: LoginBodyDTO) {
    return response(200, 'SUCCESSFULLY', body);
  }
}
