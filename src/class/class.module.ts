import { Module } from '@nestjs/common';
import { GetClassesService } from './services/get-class.service';
import { ClassController } from './class.controller';

@Module({
  providers: [GetClassesService],
  controllers: [ClassController],
})
export class ClassModule {}
