import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev_jwt_access_secret_change_in_production',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_change_in_production',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}));
