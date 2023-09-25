import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { CreateNoficationService, UpdateNoficationService } from './services';

@Module({
  controllers: [NotificationController],
  providers: [CreateNoficationService, UpdateNoficationService],
})
export class NotificationModule {}
