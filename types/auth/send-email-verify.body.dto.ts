import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailVerifyBodyDTO {
  @ApiProperty({
    example: 'annguyen@escorti.com.vn',
    required: true,
  })
  @IsString()
  email: string;
}
