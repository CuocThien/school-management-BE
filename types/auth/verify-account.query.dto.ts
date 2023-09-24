import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyAccountQueryDTO {
  @ApiProperty({
    example:
      '7b226163636f756e744964223a31387d!888b2e94bc1f20ce554b1fa593ae444098544247d9df6b5709b34fdc062188d2',
  })
  @IsString()
  hashKey: string;

  @ApiProperty({
    example: 'REGISTER_ACCOUNT',
    enum: ['REGISTER_ACCOUNT', 'FORGOT_PASSWORD'],
  })
  @IsString()
  hashType: string;
}

export class VerifyLinkQueryDTO {
  @ApiProperty({
    example:
      '7b226163636f756e744964223a31387d!888b2e94bc1f20ce554b1fa593ae444098544247d9df6b5709b34fdc062188d2',
  })
  @IsString()
  hashKey: string;

  @ApiProperty({
    example: 'REGISTER_ACCOUNT',
    enum: ['FORGOT_PASSWORD', 'CREATE_CONTACT', 'SET_PASSWORD'],
  })
  @IsString()
  hashType: string;
}
