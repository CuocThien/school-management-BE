import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class CreateScoreBodyDTO {
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
