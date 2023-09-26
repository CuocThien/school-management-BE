import { Injectable } from '@nestjs/common';
import { Notification, Profile } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { map, keyBy } from 'lodash';

@Injectable()
export class GetNotificationsService {
  public async getNotifications(query) {
    const { page = 0, limit = 20, orderType = 'DESC' } = query;
    const [notifications, total] = await getRepository(
      Notification,
    ).findAndCount({
      where: {
        isDeleted: false,
      },
      order: { id: orderType },
      take: limit,
      skip: page,
    });
    const accountIds = map(notifications, 'createdBy');
    const accounts = await getRepository(Profile).findByIds(accountIds);
    const objAccount = keyBy(accounts, 'accountId');
    const result = notifications.map((item: Notification) => {
      const { createdBy } = item;
      const author: Profile = objAccount[createdBy] || {};
      return {
        ...item,
        createdByName: author.fullName,
      };
    });
    return response(200, 'SUCCESSFULLY', { result, total });
  }
}
