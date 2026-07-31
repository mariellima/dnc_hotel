import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest<Request>();

        console.log(`Url: ${request.url}`);
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
