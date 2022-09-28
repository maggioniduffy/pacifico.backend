import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  const port = 5000;
  await app.listen(port);
  logger.log(`Applicatiopn listening on port ${port}`);
}
bootstrap();
