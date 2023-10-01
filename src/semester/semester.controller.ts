import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { GetSemestersService } from './services';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('semester')
export class SemesterController {
  constructor(private readonly getSemestersService: GetSemestersService) {}
  @Get('semesters')
  getSemesters() {
    return this.getSemestersService.getSemesters();
  }
}
