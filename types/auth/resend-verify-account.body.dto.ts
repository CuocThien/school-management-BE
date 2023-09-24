import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResendVerifyAccountBodyDTO {
  @ApiProperty({
    example: 17,
    required: true,
  })
  @IsNumber()
  accountId: number;
}
