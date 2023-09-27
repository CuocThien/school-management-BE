import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateScoreBodyDTO {
  @ApiProperty({ example: 1234, required: true })
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: 1234, required: true })
  @IsNumber()
  subjectId: number;

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
