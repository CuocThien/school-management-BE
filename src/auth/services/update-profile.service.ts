import { Injectable } from '@nestjs/common';
import { UpdateProfileBodyDTO } from 'types';

@Injectable()
export class UpdateProfileService {
  public updateProfile(body: UpdateProfileBodyDTO, accountId: number) {
    return;
  }
}
