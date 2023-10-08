import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, ValidateIf } from 'class-validator';
import { ifExistedValue, transformStringToNumber } from 'libs/utils';
import { PagingQueryDTO } from 'types/paging.query.dto';

export class GetScoresByClassQueryDTO extends PagingQueryDTO {
  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  yearId: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  semesterId: number;
}
