import { Injectable, MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { PostModule } from './modules/post/post.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AuthModule } from '@modules/auth/auth.module';
 import { Request, Response, NextFunction } from 'express'; 
import { TagModule } from '@modules/tag/tag.module';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RouterModule.forRoutes(routes),
    PostModule,
    TagModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataBaseErrorInterceptor,
    },
  ],
})
export class AppModule{

}
