import { Injectable } from '@nestjs/common';
import { Account, Profile } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class GetProfileService {
  public async getProfile(accountId: number) {
    const [account, profile] = await Promise.all([
      getRepository(Account).findOne({ id: accountId }),
      getRepository(Profile).findOne({ accountId }),
    ]);
    if (isEmpty(account)) {
      return response(404, 'ACCOUNT_NOT_FOUND');
    }
    return response(200, 'SUCCESSFULLY', {
      ...profile,
      email: account?.email || null,
    });
  }
}
