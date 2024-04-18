import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { userParams } from './user.controller';

@Injectable()
export class UserService {
  constructor() { }

  async getList(data: userParams) {
    let i: any = {}
    let list = await prisma.user.findMany({
      skip: data.pageNum - 1,
      take: data.pageSize,
      where: {
        username: {
          contains: data.username
        }
      }
    })
    i.total = await prisma.user.count()
    i.list = list
    return i
  }
}
