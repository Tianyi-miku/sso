import { Injectable } from '@nestjs/common';
import { LoginLogger } from '@prisma/client';
import { prisma } from 'src/prisma';
import { loggerParams } from './loginlogger.controller';
import { subWeeks, startOfWeek, endOfWeek, isBefore, isWithinInterval } from 'date-fns';

@Injectable()
export class LoginloggerService {

  async setloginLog(log: LoginLogger): Promise<any> {
    return prisma.loginLogger.create({
      data: log
    })
  }

  async getList(data: loggerParams) {
    let i: any = {}
    let list = await prisma.loginLogger.findMany({
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
    i.total = await prisma.loginLogger.count()
    i.list = list
    return i
  }

  async removeLoginLog(): Promise<any> {
    // 获取当前日期  
    const now = new Date();
    // 计算上一周的起始日期  
    const endOfCurrentWeek = startOfWeek(now);
    return prisma.loginLogger.deleteMany({
      where: {
        createdAt: {
          gte: endOfCurrentWeek
        }
      }
    })
  }
}
