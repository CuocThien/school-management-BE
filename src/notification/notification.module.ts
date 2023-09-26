import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import {
  CreateNoficationService,
  GetNotificationsService,
  UpdateNoficationService,
} from './services';

@Module({
  controllers: [NotificationController],
  providers: [
    CreateNoficationService,
    UpdateNoficationService,
    GetNotificationsService,
  ],
})
export class NotificationModule {}
