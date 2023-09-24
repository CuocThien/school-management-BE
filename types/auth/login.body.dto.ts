import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class LoginBodyDTO {
  @ApiProperty({ example: 'annguyen@escorti.com.vn', required: true })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password@!123', required: true })
  @IsString()
  password: string;
}
