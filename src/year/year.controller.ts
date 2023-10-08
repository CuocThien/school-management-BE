import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { GetYearsService } from './services';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('year')
export class YearController {
  constructor(private readonly getYearsService: GetYearsService) {}
  @Get('years')
  getStudents() {
    return this.getYearsService.getYears();
  }
}
