import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import {
  GetGradesService,
  GetGradesActiveByAccountTypeService,
} from './services';

@Module({
  providers: [GetGradesService, GetGradesActiveByAccountTypeService],
  controllers: [GradeController],
})
export class GradeModule {}
