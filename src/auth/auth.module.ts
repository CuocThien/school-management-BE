import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
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
} from './services';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    AuthService,
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
  ],
  controllers: [AuthController],
})
export class AuthModule {}
