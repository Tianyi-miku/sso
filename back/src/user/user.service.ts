import { Injectable } from '@nestjs/common';
import { Page, prisma } from 'src/prisma';

@Injectable()
export class UserService {
  constructor() { }

  async getList(data: Page) {
    let i: any = {}
    let list = await prisma.user.findMany({
      skip: data.pageNum - 1,
      take: data.pageSize,
    })
    i.total = await prisma.user.count()
    i.list = list
    return i
  }
}
