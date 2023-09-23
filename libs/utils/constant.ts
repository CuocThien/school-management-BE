const JWT_TOKEN_TYPE = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

const ENV_HOST_TYPE = {
  local: '0.0.0.0',
  dev: '0.0.0.0',
  staging: '0.0.0.0',
  production: '127.0.0.1',
};

export { ENV_HOST_TYPE, JWT_TOKEN_TYPE };
