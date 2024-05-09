import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const origin = 'http://192.168.0.108:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [origin, 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(9000);
}

bootstrap();
