import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    console.log(`[LOG] Method: ${method}, URL: ${url}`);

    return next
      .handle()
      .pipe(
        map((data) => {
          console.log(`[LOG] Response: ${JSON.stringify(data)}`);
          return data;
        }),
      );
  }
}