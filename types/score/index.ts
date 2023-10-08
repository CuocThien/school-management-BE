import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { transformStringToNumber } from 'libs/utils';

export * from './create-score.body.dto';
export * from './get-scores-by-class.query.dto';
export * from './create-score-average.dto';
export * from './get-study-process.query.dto';

export class ScoreParamDTO {
  @ApiProperty({ example: 1, required: true })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  scoreId: number;
}

export class ScoresParamDTO {
  @ApiProperty({ example: 1, required: true })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  classId: number;

  @ApiProperty({ example: 1, required: true })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  subjectId: number;
}

export class StudentParamDTO {
  @ApiProperty({ example: 1, required: true })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  studentId: number;
}
