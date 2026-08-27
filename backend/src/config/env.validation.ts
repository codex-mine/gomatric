import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @IsOptional()
  PORT: number = 5000;

  @IsString()
  @IsOptional()
  API_PREFIX: string = 'api/v1';

  @IsString()
  @IsOptional()
  MONGODB_URI: string = 'mongodb://localhost:27017/gomatric';

  @IsString()
  @IsOptional()
  JWT_ACCESS_SECRET: string = 'gomatric_production_jwt_access_secret_key_2026';

  @IsString()
  @IsOptional()
  JWT_ACCESS_EXPIRES_IN: string = '15m';

  @IsString()
  @IsOptional()
  JWT_REFRESH_SECRET: string = 'gomatric_production_jwt_refresh_secret_key_2026';

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRES_IN: string = '7d';

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = '*';

  @IsNumber()
  @IsOptional()
  RATE_LIMIT_TTL: number = 60;

  @IsNumber()
  @IsOptional()
  RATE_LIMIT_MAX: number = 100;

  @IsString()
  @IsOptional()
  SWAGGER_ENABLED: string = 'true';

  @IsString()
  @IsOptional()
  SMTP_HOST?: string = 'smtp.gmail.com';

  @IsNumber()
  @IsOptional()
  SMTP_PORT?: number = 587;

  @IsString()
  @IsOptional()
  SMTP_USERNAME?: string;

  @IsString()
  @IsOptional()
  SMTP_PASSWORD?: string;

  @IsString()
  @IsOptional()
  SMTP_USE_TLS?: string = 'true';

  @IsString()
  @IsOptional()
  SMTP_FROM_EMAIL?: string = 'salespilot.ai1@gmail.com';

  @IsString()
  @IsOptional()
  SMTP_FROM_NAME?: string = 'Codex Edumine';
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Environment validation error: ${errors.toString()}`);
  }
  return validatedConfig;
}
