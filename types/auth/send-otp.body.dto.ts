import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, ValidateIf } from 'class-validator';
import {
  HASH_VERIFY_TYPE,
  ifExistedValue,
  transformToStandardPhoneNumber,
} from 'libs/utils';
export class SendOtpBodyDTO {
  @ApiProperty({
    example: '05678238423',
  })
  @ValidateIf(ifExistedValue)
  @Transform(transformToStandardPhoneNumber, { toClassOnly: true })
  @Matches(/^0[0-9]{3}?[0-9]{3}?[0-9]{0,8}$/g, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @ApiProperty({
    example: HASH_VERIFY_TYPE.VERIFY_PHONE,
    enum: [HASH_VERIFY_TYPE.VERIFY_PHONE, HASH_VERIFY_TYPE.LOGIN_OTP],
    required: false,
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  hashType: string;
}
