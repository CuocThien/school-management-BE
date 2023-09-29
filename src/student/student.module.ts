import { Module } from '@nestjs/common';
import { GetStudentsService } from './services/get-students.service';
import { StudentController } from './student.controller';

@Module({
  providers: [GetStudentsService],
  controllers: [StudentController],
})
export class StudentModule {}
