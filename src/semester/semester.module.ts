import { Module } from '@nestjs/common';
import { GetSemestersService } from './services';
import { SemesterController } from './semester.controller';

@Module({
  providers: [GetSemestersService],
  controllers: [SemesterController],
})
export class SemesterModule {}
