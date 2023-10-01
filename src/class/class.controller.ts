import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import {
  GetClassesService,
  GetClassesActiveByAccountTypeService,
} from './services';
import { GetClassesByTypeQueryDTO, GetClassesQueryDTO } from 'types';
import { HttpAccountId, HttpAccountType } from 'libs/utils';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('class')
export class ClassController {
  constructor(
    private readonly getClassesService: GetClassesService,
    private readonly getClassesActiveByAccountTypeService: GetClassesActiveByAccountTypeService,
  ) {}
  @Get('classes')
  getClasses(@Query() query: GetClassesQueryDTO) {
    return this.getClassesService.getClasses(query);
  }

  @Get('classes-by-type')
  getClassesActiveByAccountType(
    @Query() query: GetClassesByTypeQueryDTO,
    @HttpAccountType() accountType,
    @HttpAccountId() accountId,
  ) {
    return this.getClassesActiveByAccountTypeService.getClassesActiveByAccountType(
      query,
      accountType,
      accountId,
    );
  }
}
