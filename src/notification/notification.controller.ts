import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { HttpAccountId } from 'libs/utils';
import {
  CreateNoficationService,
  GetNotificationsService,
  UpdateNoficationService,
} from './services';
import {
  CreateNotificationBodyDTO,
  NotificationParamDTO,
} from 'types/notification';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('notification')
export class NotificationController {
  constructor(
    private readonly createNotificationService: CreateNoficationService,
    private readonly updateNoficationService: UpdateNoficationService,
    private readonly getNotificationsService: GetNotificationsService,
  ) {}
  @Post('notification')
  createNotification(
    @Body() body: CreateNotificationBodyDTO,
    @HttpAccountId() accountId,
  ) {
    return this.createNotificationService.createNotification(body, accountId);
  }

  @Put('notification/:notificationId')
  updateNotification(
    @Body() body: CreateNotificationBodyDTO,
    @HttpAccountId() accountId,
    @Param() { notificationId }: NotificationParamDTO,
  ) {
    return this.updateNoficationService.updateNotification(
      notificationId,
      body,
      accountId,
    );
  }

  @Get('notifications')
  getNotifications(@Query() query) {
    return this.getNotificationsService.getNotifications(query);
  }
}
