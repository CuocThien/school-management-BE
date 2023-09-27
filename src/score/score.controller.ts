import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { CreateScoreService, UpdateScoreService } from './services';
import { HttpAccountId } from 'libs/utils';
import { CreateScoreBodyDTO, ScoreParamDTO } from 'types/score';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('score')
export class ScoreController {
  constructor(
    private readonly createScoreService: CreateScoreService,
    private readonly updateScoreService: UpdateScoreService,
  ) {}
  @Post('score')
  createScore(@Body() body: CreateScoreBodyDTO, @HttpAccountId() accountId) {
    return this.createScoreService.createScore(body, accountId);
  }

  @Put('score/:scoreId')
  updateScore(
    @Body() body: CreateScoreBodyDTO,
    @Param() { scoreId }: ScoreParamDTO,
    @HttpAccountId() accountId,
  ) {
    console.log(scoreId);
    return this.updateScoreService.updateScore(scoreId, body, accountId);
  }
}
