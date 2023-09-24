import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIxIiwiaWF0IjoxNjczNzc0MTQzLCJleHAiOjE2NzM4NjA1NDN9.cVqZdqfulFenIZLqlMLx4Qnc-kY_wB0KoEAOvZQ7H28',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIxIiwiaWF0IjoxNjczNzc0MTQzLCJleHAiOjE2NzM4NjA1NDN9.Ganb0ONxFvMba0alp8Tr6aV07Frbr3jE_McxLOQ21d4',
  })
  refreshToken: string;

  @ApiProperty({
    example: true,
  })
  isFirstLogin: boolean;

  @ApiProperty({
    example: true,
  })
  isPhoneVerified: boolean;
}
