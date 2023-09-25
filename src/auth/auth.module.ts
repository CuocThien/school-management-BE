import { Module } from '@nestjs/common';
import {
  AddFcmTokenService,
  ChangePasswordService,
  ForgotPasswordService,
  GetAccessTokenService,
  GetProfileService,
  LoginService,
  LogoutService,
  RegisterAccountService,
  RenewAccessTokenService,
  SendEmailVerifyService,
  SendOtpLoginService,
  SendOtpVerifyService,
  SendSettingPasswordService,
  SetPasswordService,
  UpdateProfileService,
  ValidateTokenService,
  VerifyAccountService,
  VerifyPhoneService,
} from './services';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  JwtAccessTokenStrategy,
  JwtRefreshTokenStrategy,
  LocalStrategy,
} from 'libs/middleware';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AddFcmTokenService,
    ChangePasswordService,
    ForgotPasswordService,
    GetAccessTokenService,
    GetProfileService,
    LoginService,
    LogoutService,
    RegisterAccountService,
    SendEmailVerifyService,
    SendOtpLoginService,
    SendOtpVerifyService,
    SendSettingPasswordService,
    SetPasswordService,
    UpdateProfileService,
    VerifyAccountService,
    VerifyPhoneService,
    JwtService,
    LocalStrategy,
    ConfigService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    ValidateTokenService,
    RenewAccessTokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
