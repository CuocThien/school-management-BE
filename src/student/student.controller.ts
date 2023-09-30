import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { HttpAccountId, HttpAccountType, response } from 'libs/utils';
import { GetStudentService, GetStudentsService } from './services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { GetStudentsQueryDTO } from 'types';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('student')
export class StudentController {
  constructor(
    private readonly getStudentsService: GetStudentsService,
    private readonly getStudentService: GetStudentService,
  ) {}
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

  @Get('student/:id')
  getStudent(@Param() { id }) {
    return this.getStudentService.getStudent(Number(id));
  }
}
