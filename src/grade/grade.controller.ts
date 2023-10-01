import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import {
  GetGradesActiveByAccountTypeService,
  GetGradesService,
} from './services';
import { HttpAccountId, HttpAccountType } from 'libs/utils';
import { GetGradesByTypeQueryDTO } from 'types';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('grade')
export class GradeController {
  constructor(
    private readonly getGradesService: GetGradesService,
    private readonly getGradesActiveByAccountTypeService: GetGradesActiveByAccountTypeService,
  ) {}

  @Get('grades')
  getGrades() {
    return this.getGradesService.getGrades();
  }

  @Get('grades-by-type')
  getGradesActiveByAccountType(
    @Query() query: GetGradesByTypeQueryDTO,
    @HttpAccountType() accountType,
    @HttpAccountId() accountId,
  ) {
    return this.getGradesActiveByAccountTypeService.getGradesActiveByAccountType(
      query,
      accountType,
      accountId,
    );
  }
}
