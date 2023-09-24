import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class AddFcmTokenBodyDTO {
  @ApiProperty({ example: 'ef11fb520147ab90', required: false })
  @IsString()
  deviceUuid: string;

  @ApiProperty({ example: '', required: true })
  @IsString()
  fcmToken: string;

  @ApiProperty({ example: '1.5.7', required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  appVersion: string;
}
