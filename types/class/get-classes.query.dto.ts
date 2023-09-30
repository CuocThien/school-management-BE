import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class GetClassesQueryDTO {
  // @ApiProperty({ example: null, required: false })
  // @ValidateIf(ifExistedValue)
  // @IsString()
  // queryString: string;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumber()
  gradeId: number;
}
