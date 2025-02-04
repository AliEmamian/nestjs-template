import * as dotenv from 'dotenv';
dotenv.config();


import { NestExpressApplication } from '@nestjs/platform-express';
import { APP_FILTER, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { AppModule, logger } from './app.module';
import { server } from './config/server.config';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { dbEnvironmentValidation } from './config/database.config';
import { versioningConfig } from './config/versioning.config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AllExceptionsFilter } from './interceptor/error-response.interceptor';

async function bootstrap() {
  // Environment Configuration & Validation
  dbEnvironmentValidation();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new DataBaseErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.use(logger)
  // Logging config

  // Versioning config
  versioningConfig(app);

  await app.listen(server.port, server.ip);
  console.log('project start on:',server.ip,":",server.port)
}



bootstrap();
