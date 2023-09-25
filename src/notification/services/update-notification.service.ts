import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Notification } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class UpdateNoficationService {
  public async updateNotification(notificationId: number, body, reqUserId) {
    const notification = await getRepository(Notification).findOne({
      id: notificationId,
      isDeleted: false,
    });
    if (isEmpty(notification)) return response(404, 'DATA_NOT_FOUND');
    await getRepository(Notification).save({
      title: body.title,
      description: body.description,
      targetType: body.targetType,
      updatedAt: new Date(),
      updatedBy: reqUserId,
    });
    return response(200, 'SUCCESSFULLY', Object.assign(notification, body));
  }
}
