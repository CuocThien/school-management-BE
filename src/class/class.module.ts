import { Module } from '@nestjs/common';
import {
  GetClassesService,
  GetClassesActiveByAccountTypeService,
} from './services';
import { ClassController } from './class.controller';

@Module({
  providers: [GetClassesService, GetClassesActiveByAccountTypeService],
  controllers: [ClassController],
})
export class ClassModule {}
