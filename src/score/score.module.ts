import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import {
  CreateScoreService,
  UpdateScoreService,
  GetScoresByClassAndSubjectService,
  GetStudyProcessService,
  GetScoreFinalService,
} from './services';

@Module({
  controllers: [ScoreController],
  providers: [
    CreateScoreService,
    UpdateScoreService,
    GetScoresByClassAndSubjectService,
    GetStudyProcessService,
    GetScoreFinalService,
  ],
})
export class ScoreModule {}
