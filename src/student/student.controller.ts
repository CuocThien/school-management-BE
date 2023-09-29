import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HttpAccountId, HttpAccountType, response } from 'libs/utils';
import { GetStudentsService } from './services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { GetStudentsQueryDTO } from 'types';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('student')
export class StudentController {
  constructor(private readonly getStudentsService: GetStudentsService) {}
  @Get('students')
  getStudents(
    @Query() query: GetStudentsQueryDTO,
    @HttpAccountType() accountType: string,
    @HttpAccountId() accountId: number,
  ) {
    if (!['FORM_TEACHER', 'ADMIN'].includes(accountType)) {
      return response(403, 'NOT_HAVE_PERMISSION');
    }
    if (accountType == 'ADMIN') {
      return this.getStudentsService.getStudentsByAdmin(query);
    }
    return this.getStudentsService.getStudentsByFormTeacher(query, accountId);
  }
}
