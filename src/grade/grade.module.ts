import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GetGradesService } from './services';

@Module({
  providers: [GetGradesService],
  controllers: [GradeController],
})
export class GradeModule {}
