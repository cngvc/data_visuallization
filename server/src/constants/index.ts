import { config as dotenvConfig } from 'dotenv';
dotenvConfig({});

export const SERVICE_NAME = 'Court Reserve';
export const SERVER_PORT = process.env.SERVER_PORT || 4000;

export const isProduction = process.env.NODE_ENV === 'staging';
