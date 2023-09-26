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
    const systemPermissions = ['CRM'];
    const permissions = [
      'F_DASHBOARD',
      'F_MEMBER',
      'F_STAFF',
      'F_STORE',
      'F_ORDER',
      'F_SALE',
      'F_MARKETING',
      'F_REPORT',
      'F_SETTING',
    ];
    return response(200, 'SUCCESSFULLY', {
      ...profile,
      ...account,
      email: account?.email || null,
      permissions,
      systemPermissions,
    });
  }
}
