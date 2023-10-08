import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { ifExistedValue, transformStringToNumber } from 'libs/utils';
import { PagingQueryDTO } from 'types/paging.query.dto';

export class GetStudentsQueryDTO extends PagingQueryDTO {
  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  queryString: string;

  @ApiProperty({ example: null, required: false })
  @Transform(transformStringToNumber)
  @IsNumber()
  yearId: number;

  @ApiProperty({ example: null, required: false })
  @Transform(transformStringToNumber)
  @IsNumber()
  semesterId: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  classId: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  gender: number;
}
