import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class GetStudentsQueryDTO {
  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  queryString: string;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumber()
  gradeId: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumber()
  classId: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumber()
  gender: number;
}
