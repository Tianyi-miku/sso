import { Injectable } from '@nestjs/common';
import { Logger } from '@prisma/client';
import { prisma } from 'src/prisma';
import { loggerParams } from './logger.controller';
import { subWeeks, startOfWeek, endOfWeek, isBefore, isWithinInterval } from 'date-fns';

@Injectable()
export class LoggerService {

  async setLog(log: Logger): Promise<any> {
    return prisma.logger.create({
      data: log
    })
  }

  async getList(data: loggerParams) {
    let i: any = {}
    let list = await prisma.logger.findMany({
      skip: data.pageNum - 1,
      take: data.pageSize,
      where: {
        controls: {
          contains: data.controls
        }
      },
      include: {
        user: {
          include: {
            Role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    i.total = await prisma.logger.count()
    i.list = list
    return i
  }

  async removeLog(): Promise<any> {
    // 获取当前日期  
    const now = new Date();
    // 计算上一周的起始日期  
    const endOfCurrentWeek = startOfWeek(now);
    return prisma.logger.deleteMany({
      where: {
        createdAt: {
          gte: endOfCurrentWeek
        }
      }
    })
  }

}
