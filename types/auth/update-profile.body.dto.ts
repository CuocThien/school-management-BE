import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class UpdateProfileBodyDTO {
  @ApiProperty({
    example: 'Nguyen',
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Van',
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  middleName: string;

  @ApiProperty({
    example: 'An',
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '123@gmail.com',
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  email: string;

  @ApiProperty({
    example: 'image.jpg',
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  avatar: string;
}
