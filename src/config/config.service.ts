export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: 3000,
      accessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      accessExpTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
      refreshExpTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
