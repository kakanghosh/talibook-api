import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  const PROTOCOL = configService.get<string>('APP.HTTP_PROTOCOL');
  const HOST_NAME = configService.get<string>('APP.HOST_NAME');
  const PORT = configService.get<number>('APP.PORT');
  await app.listen(PORT, () => {
    logger.log(`Listening at ${PROTOCOL}://${HOST_NAME}:${PORT}`);
  });
}

bootstrap();
