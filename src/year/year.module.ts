import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { GetYearsService } from './services';

@Module({
  controllers: [YearController],
  providers: [GetYearsService],
})
export class YearModule {}
