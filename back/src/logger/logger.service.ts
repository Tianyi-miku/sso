import { Injectable } from '@nestjs/common';
import { Logger } from '@prisma/client';
import { prisma } from 'src/prisma';

@Injectable()
export class LoggerService {

  async setLog(log: Logger): Promise<any> {
    return prisma.logger.create({
      data: log
    })
  }
}
