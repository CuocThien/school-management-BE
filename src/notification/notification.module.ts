import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import {
  CreateNoficationService,
  DeleteNoficationService,
  GetNotificationsService,
  UpdateNoficationService,
} from './services';

@Module({
  controllers: [NotificationController],
  providers: [
    CreateNoficationService,
    UpdateNoficationService,
    GetNotificationsService,
    DeleteNoficationService,
  ],
})
export class NotificationModule {}
