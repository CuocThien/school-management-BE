import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveFcmTokenBodyDTO {
  @ApiProperty({ example: 'ef11fb520147ab90', required: true })
  @IsString()
  deviceUuid: string;
}
