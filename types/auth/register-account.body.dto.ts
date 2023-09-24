import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class RegisterAccountBodyDTO {
  @ApiProperty({ example: '0123456789', required: true })
  @IsString()
  organizationName: string;

  @ApiProperty({ example: 'Nguyen', required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Van' })
  @ValidateIf(ifExistedValue)
  @IsString()
  middleName: string;

  @ApiProperty({ example: 'An', required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'annguyen@escorti.com.vn', required: true })
  @IsString()
  email: string;

  @ApiProperty({ example: '0123456789', required: true })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'password@!123', required: true })
  @IsString()
  password: string;
}
