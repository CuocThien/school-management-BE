import { Module } from '@nestjs/common';
import { GetStudentsService, GetStudentService } from './services';
import { StudentController } from './student.controller';

@Module({
  providers: [GetStudentsService, GetStudentService],
  controllers: [StudentController],
})
export class StudentModule {}
