import { config as dotenvConfig } from 'dotenv';
dotenvConfig({});

class Config {
  public DATABASE_URL: string | undefined;
  public SERVER_URL: string | undefined;
  public SMTP_HOST: string | undefined;
  public SMTP_PORT: number;
  public SMTP_USER: string | undefined;
  public SMTP_PASS: string | undefined;
  public SMTP_SECURE: boolean;
  public FROM_EMAIL: string | undefined;
  public APP_URL: string | undefined;
  public NODE_ENV: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.SERVER_URL = process.env.SERVER_URL;
    this.SMTP_HOST = process.env.SMTP_HOST;
    this.SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
    this.SMTP_USER = process.env.SMTP_USER;
    this.SMTP_PASS = process.env.SMTP_PASS;
    this.SMTP_SECURE = process.env.SMTP_SECURE === 'true';
    this.FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@example.com';
    this.APP_URL = process.env.APP_URL || 'http://localhost:3000';
    this.NODE_ENV = process.env.NODE_ENV || 'development';
  }
}

export const config: Config = new Config();
