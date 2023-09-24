import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordBodyDTO {
  @ApiProperty({
    example: 'password@123',
    required: true,
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'newPassowrd@123',
    required: true,
  })
  @IsString()
  newPassword: string;
}
