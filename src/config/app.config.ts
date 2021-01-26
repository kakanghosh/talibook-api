import { registerAs } from '@nestjs/config';

export default registerAs('APP', () => ({
  HTTP_PROTOCOL: process.env.HTTP_PROTOCOL,
  HOST_NAME: process.env.HOST_NAME,
  PORT: parseInt(process.env.PORT, 10),
  ENV: process.env.APP_ENV,
}));
