import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          status: 200, // مقدار وضعیت موفق
          message: 'Success', // پیام پیش‌فرض
          data: data || {}, // داده‌های بازگشتی
        })),
      );
    }
  }
  