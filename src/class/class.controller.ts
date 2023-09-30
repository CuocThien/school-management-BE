import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { GetClassesService } from './services';
import { GetClassesQueryDTO } from 'types';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('class')
export class ClassController {
  constructor(private readonly getClassesService: GetClassesService) {}
  @Get('classes')
  getClasses(@Query() query: GetClassesQueryDTO) {
    return this.getClassesService.getClasses(query);
  }
}
