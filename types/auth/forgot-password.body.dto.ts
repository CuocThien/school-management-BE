import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordBodyDTO {
  @ApiProperty({
    example: 'annguyen@escorti.com.vn',
    required: true,
  })
  @IsString()
  email: string;
}
