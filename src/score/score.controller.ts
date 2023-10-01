import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import {
  CreateScoreService,
  GetScoresByClassAndSubjectService,
  UpdateScoreService,
  CreateScoreAverageService,
} from './services';
import { HttpAccountId } from 'libs/utils';
import {
  CreateScoreAverageBodyDTO,
  CreateScoreBodyDTO,
  GetScoresByClassQueryDTO,
  ScoreParamDTO,
  ScoresParamDTO,
} from 'types/score';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('score')
export class ScoreController {
  constructor(
    private readonly createScoreService: CreateScoreService,
    private readonly updateScoreService: UpdateScoreService,
    private readonly getScoresByClassAndSubjectService: GetScoresByClassAndSubjectService,
    private readonly createScoreAverageService: CreateScoreAverageService,
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
    return this.updateScoreService.updateScore(scoreId, body, accountId);
  }

  @Get('scores/:classId/:subjectId')
  getScoresByClassAndSubject(
    @Param() params: ScoresParamDTO,
    @Query() query: GetScoresByClassQueryDTO,
  ) {
    return this.getScoresByClassAndSubjectService.getScoresByClassAndSubject({
      ...params,
      ...query,
    });
  }

  @Post('score-average')
  createScoreAverage(
    @Body() body: CreateScoreAverageBodyDTO,
    @HttpAccountId() accountId,
  ) {
    return this.createScoreAverageService.createScoreAverage(body, accountId);
  }
}
