import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ifExistedValue, transformStringToNumber } from 'libs/utils';

export class CreateScoreBodyDTO {
  @ApiProperty({ example: 1, required: false })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  classId: number;

  @ApiProperty({ example: 1, required: false })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  yearId: number;

  @ApiProperty({ example: 1, required: false })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  semesterId: number;

  @ApiProperty({ example: 8.5, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumberString()
  averageScore: number;

  @ApiProperty({ example: 8.5, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumberString()
  miniTest1Score: number;

  @ApiProperty({ example: 8.5, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumberString()
  miniTest2Score: number;

  @ApiProperty({ example: 8.5, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumberString()
  miniTest3Score: number;

  @ApiProperty({ example: 8.5, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumberString()
  midtermTestScore: number;

  @ApiProperty({ example: 8.5, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumberString()
  endtermTestScore: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  review: string;
}
