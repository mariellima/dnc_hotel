/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { unlink } from 'fs';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException) {
          const request = context.switchToHttp().getRequest();
          const file = request.file;
          if (file) {
            unlink(file.path, (err) => {
              if (err) console.error('Erro ao remover arquivo:', err);
            });
          }
        }
        throw error;
      }),
    );
  }
}
