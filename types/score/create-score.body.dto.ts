import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateScoreBodyDTO {
  @ApiProperty({ example: 8.5, required: false })
  @IsNumber()
  miniTest1Score: number;

  @ApiProperty({ example: 8.5, required: false })
  @IsNumber()
  miniTest2Score: number;

  @ApiProperty({ example: 8.5, required: false })
  @IsNumber()
  miniTest3Score: number;

  @ApiProperty({ example: 8.5, required: false })
  @IsNumber()
  midTermTestSscore: number;

  @ApiProperty({ example: 8.5, required: false })
  @IsNumber()
  endTermTestScore: number;
}
