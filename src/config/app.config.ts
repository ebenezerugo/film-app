import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import validateConfig from 'src/utils/validate-config';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  validate,
} from 'class-validator';

enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
  PROVISION = 'provision',
  QA = 'qa',
  UAT = 'uat',
  DEMO = 'demo',
  LOCAL = 'local',
  DOCKER = 'docker',
  DOCKER_COMPOSE = 'docker-compose',
  KUBERNETES = 'kubernetes',
  OPENSHIFT = 'openshift',
  HEROKU = 'heroku',
  AWS = 'aws',
  AZURE = 'azure',
  GOOGLE_CLOUD = 'google-cloud',
  DIGITAL_OCEAN = 'digital-ocean',
  LINODE = 'linode',
  VULTR = 'vultr',
  OTHER = 'other',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsString()
  APP_NAME: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsOptional()
  APP_DESCRIPTION: string;

  @IsString()
  @IsOptional()
  APP_VERSION: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  PORT: number;

  @IsString()
  @IsOptional()
  APP_KEY: string;

  @IsString()
  @IsOptional()
  WORKING_DIRECTORY: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  APP_DOMAIN: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
    name: process.env.APP_NAME || 'app',
    description: process.env.APP_DESCRIPTION || 'app',
    version: process.env.APP_VERSION || '1.0',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000,
    key: process.env.APP_KEY || '',
    workingDirectory: process.env.WORKING_DIRECTORY || process.cwd(),
    domain: process.env.APP_DOMAIN || 'http://localhost',
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  };
});
