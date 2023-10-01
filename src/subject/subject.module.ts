import { Module } from '@nestjs/common';
import {
  GetAllSubjectsService,
  GetSubjectsByAccountTypeService,
} from './services';
import { SubjectController } from './subject.controller';

@Module({
  providers: [GetAllSubjectsService, GetSubjectsByAccountTypeService],
  controllers: [SubjectController],
})
export class SubjectModule {}
