import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { transformStringToNumber } from 'libs/utils';

export class GetStudyProcessQueryDTO {
  @ApiProperty({ example: null, required: false })
  @Transform(transformStringToNumber)
  @IsNumber()
  yearId: number;

  @ApiProperty({ example: null, required: false })
  @Transform(transformStringToNumber)
  @IsNumber()
  semesterId: number;
}
