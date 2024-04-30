import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { Logger } from '@prisma/client';
import { LoginloggerService } from 'src/loginlogger/loginlogger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly loggerservice: LoggerService, private readonly LoginloggerService: LoginloggerService) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    if (url.includes('/loginout') || url.includes('/login') || url.includes('/logger')) {
      return next
        .handle()
    }

    if ((!url.includes('/logger') || !url.includes('/loginout')) && user?.id) {
      const log: any = {
        userId: user.id,
        username: user.username,
        controls: `Method: ${method}, URL: ${url}`,
      }
      await this.loggerservice.setLog(log)
    }

    return next
      .handle()
    // .pipe(
    //   map((data) => {
    //     console.log(`[LOG] Response: ${JSON.stringify(data)}`);
    //     return data;
    //   }),
    // );
  }
}