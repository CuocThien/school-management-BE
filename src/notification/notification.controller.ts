import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { HttpAccountId, HttpAccountType } from 'libs/utils';
import {
  CreateNoficationService,
  DeleteNoficationService,
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
    private readonly deleteNoficationService: DeleteNoficationService,
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
  getNotifications(@Query() query, @HttpAccountType() accountType) {
    return this.getNotificationsService.getNotifications(query, accountType);
  }

  @Delete('notification/:id')
  deleteNotification(@Param() { id }, @HttpAccountId() accountId) {
    return this.deleteNoficationService.deleteNotification(id, accountId);
  }
}
