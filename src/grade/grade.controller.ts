import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { GetGradesService } from './services';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('grade')
export class GradeController {
  constructor(private readonly getGradesService: GetGradesService) {}

  @Get('grades')
  getNotifications() {
    return this.getGradesService.getGrades();
  }
}
