import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger();
  // const httpsOptions = {
  //   key: fs.readFileSync(
  //     '/etc/letsencrypt/live/pacificoapi.online/privkey.pem',
  //   ),
  //   cert: fs.readFileSync(
  //     '/etc/letsencrypt/live/pacificoapi.online/fullchain.pem',
  //   ),
  // };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`Applicatiopn listening on port ${port}`);
}
bootstrap();
