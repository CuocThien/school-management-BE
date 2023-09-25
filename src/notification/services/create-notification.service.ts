import { Injectable } from '@nestjs/common';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { Notification } from 'libs/entities';

@Injectable()
export class CreateNoficationService {
  public async createNotification(body, accountId) {
    const notification = await getRepository(Notification).save({
      title: body.title,
      description: body.description,
      targetType: body.targetType,
      createdAt: new Date(),
      createdBy: accountId,
    });
    return response(200, 'SUCCESSFULLY', notification);
  }
}
