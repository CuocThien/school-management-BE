import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import {
  GetAllSubjectsService,
  GetSubjectsByAccountTypeService,
} from './services';
import { HttpAccountId, HttpAccountType } from 'libs/utils';
import { GetSubjectsQueryDTO } from 'types';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('subject')
export class SubjectController {
  constructor(
    private readonly getAllSubjectsService: GetAllSubjectsService,
    private readonly getSubjectsByAccountTypeService: GetSubjectsByAccountTypeService,
  ) {}

  @Get('all-subjects')
  getAllSubjects() {
    return this.getAllSubjectsService.getAllSubjects();
  }

  @Get('subjects')
  getSubjectsByAccountType(
    @Query() query: GetSubjectsQueryDTO,
    @HttpAccountType() accountType,
    @HttpAccountId() accountId,
  ) {
    return this.getSubjectsByAccountTypeService.getSubjectsByAccountType(
      query,
      accountType,
      accountId,
    );
  }
}
