import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { CreateScoreService, UpdateScoreService } from './services';

@Module({
  controllers: [ScoreController],
  providers: [CreateScoreService, UpdateScoreService],
})
export class ScoreModule {}
