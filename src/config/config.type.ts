export type AppConfig = {
  nodeEnv: string;
  name: string;
  description: string;
  version: string;
  port: number;
  key: string;
  workingDirectory: string;
  domain: string;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
};

export type DatabaseConfig = {
  url: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
  maxConnections: number;
  sslEnabled: boolean;
  rejectUnauthorized: boolean;
  ca: string;
  key: string;
  cert: string;
};

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};
