import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateNotificationBodyDTO {
  @ApiProperty({ example: 'Thông bao...', required: true })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Desctiption....', required: true })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'ALL',
    enum: ['ALL', 'STUDENT', 'TEACHER'],
    required: true,
  })
  @IsEnum(['ALL', 'STUDENT', 'TEACHER'])
  targetType: string;
}
