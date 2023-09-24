import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetPasswordBodyDTO {
  @ApiProperty({
    example:
      '7b226163636f756e744964223a31387d!888b2e94bc1f20ce554b1fa593ae444098544247d9df6b5709b34fdc062188d2',
    required: true,
  })
  @IsString()
  hashKey: string;

  @ApiProperty({
    example: 'FORGOT_PASSWORD',
    enum: ['REGISTER_ACCOUNT', 'FORGOT_PASSWORD'],
    required: true,
  })
  @IsString()
  hashType: string;

  @ApiProperty({
    example: 'password@123',
    required: true,
  })
  @IsString()
  password: string;
}
