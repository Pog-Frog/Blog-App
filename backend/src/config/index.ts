import { config } from 'dotenv';

config({ path: '.env' });

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'SUS';
export const DB_HOST = process.env.MONGO_URI || 'localhost';
export const DB_NAME = process.env.DB_NAME || 'blog_test';
export const DB_PORT = process.env.DB_PORT || '27017';
export const LOG_FORMAT = process.env.LOG_FORMAT || 'dev';
export const ORIGIN = process.env.ORIGIN || '*';
export const CREDENTIALS = process.env.CREDENTIALS === 'true';