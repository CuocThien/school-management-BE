import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Notification } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';

@Injectable()
export class DeleteNoficationService {
  public async deleteNotification(notificationId: number, reqUserId) {
    const notification = await getRepository(Notification).findOne({
      id: notificationId,
      isDeleted: false,
    });
    if (isEmpty(notification)) return response(404, 'DATA_NOT_FOUND');
    await getRepository(Notification).update(
      { id: notification.id },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: reqUserId,
      },
    );
    return response(200, 'SUCCESSFULLY');
  }
}
