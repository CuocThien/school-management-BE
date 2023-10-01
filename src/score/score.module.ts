import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import {
  CreateScoreService,
  UpdateScoreService,
  GetScoresByClassAndSubjectService,
} from './services';

@Module({
  controllers: [ScoreController],
  providers: [
    CreateScoreService,
    UpdateScoreService,
    GetScoresByClassAndSubjectService,
  ],
})
export class ScoreModule {}
