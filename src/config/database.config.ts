import { registerAs } from '@nestjs/config';

export default registerAs('DATABASE', () => ({
  HOST: process.env.DATABASE_HOST,
  PORT: parseInt(process.env.DATABASE_PORT, 10),
  USERNANE: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  NAME: process.env.DATABASE_NAME,
  MIGRATIONS_RUN: true,
}));
