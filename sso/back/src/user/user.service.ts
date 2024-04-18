import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { userParams } from './user.controller';
import { User } from '@prisma/client';

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

  async update(params: User) {
    return await prisma.user.update({
      where: {
        id: params.id,
      },
      data: params,
    })
  }

  async remove(id: number) {
    return await prisma.user.delete({
      where: {
        id: id
      },
    })
  }

}
