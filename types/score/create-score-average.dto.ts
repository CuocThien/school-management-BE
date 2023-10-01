import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateScoreAverageBodyDTO {
  @ApiProperty({ example: 8.5, required: true })
  @IsNumber()
  score: number;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  classSubjectId: number;
}
