import { Injectable } from '@nestjs/common';
import { Account, AccountToken } from 'libs/entities';
import { JWT_TOKEN_TYPE, response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { LoginBodyDTO } from 'types';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}

  private async _comparePassword(passwordHash, password) {
    return await bcrypt.compare(password, passwordHash);
  }

  private _createToken(data: any, type = JWT_TOKEN_TYPE.ACCESS_TOKEN) {
    const envSecret =
      type == JWT_TOKEN_TYPE.ACCESS_TOKEN
        ? 'JWT_ACCESS_TOKEN_SECRET'
        : 'JWT_REFRESH_TOKEN_SECRET';
    const envExpire =
      type == JWT_TOKEN_TYPE.ACCESS_TOKEN
        ? 'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
        : 'JWT_REFRESH_TOKEN_EXPIRATION_TIME';
    const options = {
      secret: process.env[envSecret],
      expiresIn: process.env[envExpire],
    };
    return this.jwtService.sign(data, options);
  }

  private async _getTokens(account) {
    const tokenPayload = {
      accountId: account.id,
      organizationId: account.organizationId,
    };
    const accessToken = this._createToken(
      tokenPayload,
      JWT_TOKEN_TYPE.ACCESS_TOKEN,
    );
    const refreshToken = this._createToken(
      tokenPayload,
      JWT_TOKEN_TYPE.REFRESH_TOKEN,
    );
    const accTokenPayload = {
      accountId: account.id,
      accessToken,
      refreshToken,
      createdAt: new Date(),
      createdBy: account.id,
      type: 'LOGIN',
    };
    const accToken = await getRepository(AccountToken).save(accTokenPayload);
    return accToken;
  }

  public async login(body: LoginBodyDTO) {
    const { username, password } = body;
    const account = await getRepository(Account).findOne({
      email: username,
      isDeleted: false,
    });
    if (isEmpty(account)) {
      return response(400, 'INVALID_LOGIN_INFO');
    }
    const { passwordHash } = account;
    if (!passwordHash) {
      return response(400, 'NOT_SET_PASSWORD_YET');
    }
    const isValidPassword = await this._comparePassword(passwordHash, password);
    if (!isValidPassword) {
      return response(400, 'INVALID_LOGIN_INFO');
    }
    const { accessToken, refreshToken } = await this._getTokens(account);
    return response(200, 'SUCCESSFULLY', {
      id: account.id,
      accessToken,
      refreshToken,
    });
  }
}
