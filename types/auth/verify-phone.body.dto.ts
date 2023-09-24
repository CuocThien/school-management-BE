import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, ValidateIf } from 'class-validator';
import { ifExistedValue, transformToStandardPhoneNumber } from 'libs/utils';

export class VerifyPhoneBodyDTO {
  @ApiProperty({
    example: '08927349023',
  })
  @ValidateIf(ifExistedValue)
  @Transform(transformToStandardPhoneNumber, { toClassOnly: true })
  @Matches(/^0[0-9]{3}?[0-9]{3}?[0-9]{0,8}$/g, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @ApiProperty({
    example: '2378',
  })
  @IsString()
  otp: string;
}
