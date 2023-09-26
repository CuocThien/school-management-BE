import { Injectable } from '@nestjs/common';
import { Notification, Profile } from 'libs/entities';
import { getQueryPaging, response } from 'libs/utils';
import { In, getRepository } from 'typeorm';
import { map, keyBy } from 'lodash';

@Injectable()
export class GetNotificationsService {
  public async getNotifications(query, accountType) {
    const { orderType = 'DESC' } = query;
    const [skip, take] = getQueryPaging(query);
    const conditions = { isDeleted: false };
    if (['STUDENT', 'TEACHER'].includes(accountType)) {
      Object.assign(conditions, {
        targetType: In(['ALL', accountType]),
      });
    }
    const [notifications, total] = await getRepository(
      Notification,
    ).findAndCount({
      where: conditions,
      order: { id: orderType },
      take,
      skip,
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
