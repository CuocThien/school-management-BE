import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AddFcmTokenBodyDTO,
  ChangePasswordBodyDTO,
  ForgotPasswordBodyDTO,
  LoginBodyDTO,
  RegisterAccountBodyDTO,
  ResendVerifyAccountBodyDTO,
  SendOtpBodyDTO,
  SetPasswordBodyDTO,
  UpdateProfileBodyDTO,
  VerifyAccountQueryDTO,
  LoginOtpBodyDTO,
  VerifyPhoneBodyDTO,
} from 'types';
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
import {
  JwtAccessTokenGuard,
  JwtRefreshTokenGuard,
  LocalAuthGuard,
  OtpAuthGuard,
} from 'libs/middleware';
import { HttpAccountId, getToken, parseHash } from 'libs/utils';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly addFcmTokenService: AddFcmTokenService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly getAccessTokenService: GetAccessTokenService,
    private readonly getProfileService: GetProfileService,
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly registerAccountService: RegisterAccountService,
    private readonly sendEmailVerifyService: SendEmailVerifyService,
    private readonly sendOtpLoginService: SendOtpLoginService,
    private readonly sendOtpVerifyService: SendOtpVerifyService,
    private readonly sendSettingPasswordService: SendSettingPasswordService,
    private readonly setPasswordService: SetPasswordService,
    private readonly updateProfileService: UpdateProfileService,
    private readonly verifyAccountService: VerifyAccountService,
    private readonly verifyPhoneService: VerifyPhoneService,
  ) {}
  @Post('register-account')
  registerAccount(@Body() body: RegisterAccountBodyDTO) {
    return this.registerAccountService.registerAccount(body);
  }

  @Get('verify')
  verifyAccount(@Query() query: VerifyAccountQueryDTO) {
    query = Object.assign(query, {
      hashKey: parseHash(query.hashKey),
    });
    return this.verifyAccountService.verifyAccount(query);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() body: LoginBodyDTO, @Req() req) {
    return req.user;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login-otp')
  @UseGuards(OtpAuthGuard)
  loginOtp(@Body() body: LoginOtpBodyDTO, @Req() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Post('send-otp-verify')
  @UsePipes(new ValidationPipe({ transform: true }))
  sendOtpVerify(@Body() body: SendOtpBodyDTO) {
    return this.sendOtpVerifyService.sendOtpVerify(body);
  }

  @Post('send-otp-login')
  @UsePipes(new ValidationPipe({ transform: true }))
  sendOtpLogin(@Body() body: SendOtpBodyDTO) {
    return this.sendOtpLoginService.sendOtpLogin(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Post('verify-phone')
  @UsePipes(new ValidationPipe({ transform: true }))
  verifyPhone(@Body() body: VerifyPhoneBodyDTO) {
    return this.verifyPhoneService.verifyPhone(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Put('profile')
  updateProfile(
    @Body() body: UpdateProfileBodyDTO,
    @HttpAccountId() accountId,
  ) {
    return this.updateProfileService.updateProfile(body, accountId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Post('change-password')
  changePassword(
    @Body() body: ChangePasswordBodyDTO,
    @HttpAccountId() accountId,
  ) {
    return this.changePasswordService.changePassword(body, accountId);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordBodyDTO) {
    return this.forgotPasswordService.forgotPassword(body);
  }

  @Post('set-password')
  setPassword(@Body() body: SetPasswordBodyDTO) {
    Object.assign(body, {
      hashKey: parseHash(body.hashKey),
    });
    return this.setPasswordService.setPassword(body);
  }

  @Post('resend-verify-account')
  sendEmailVerify(@Body() body: ResendVerifyAccountBodyDTO) {
    return this.sendEmailVerifyService.sendEmailVerify(body);
  }

  @Post('resend-set-password')
  sendSettingPassword(@Body() body: ResendVerifyAccountBodyDTO) {
    return this.sendSettingPasswordService.sendSettingPassword(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Get('token/refresh')
  getAccessToken(@Req() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Post('add-fcm-token')
  addFcmToken(
    @Body() body: AddFcmTokenBodyDTO,
    @HttpAccountId() accountId,
    @Req() req,
  ) {
    const accessToken = getToken(req);
    return this.addFcmTokenService.addFcmToken(body, accessToken, accountId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @Post('logout')
  logout(@HttpAccountId() accountId, @Req() req) {
    const accessToken = getToken(req);
    return this.logoutService.logout(accessToken, accountId);
  }
}
