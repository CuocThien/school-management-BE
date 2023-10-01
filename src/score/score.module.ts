import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import {
  CreateScoreService,
  UpdateScoreService,
  GetScoresByClassAndSubjectService,
  CreateScoreAverageService,
} from './services';

@Module({
  controllers: [ScoreController],
  providers: [
    CreateScoreService,
    UpdateScoreService,
    GetScoresByClassAndSubjectService,
    CreateScoreAverageService,
  ],
})
export class ScoreModule {}
