import { Injectable } from '@nestjs/common';
import { roleParams } from './role.controller';
import { prisma } from 'src/prisma';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService {
  async getList(parms: roleParams) {
    let i: any = {}
    let list = await prisma.role.findMany({
      skip: parms.pageNum - 1,
      take: parms.pageSize,
      where: {
        name: {
          contains: parms.name
        }
      }
    })
    i.total = await prisma.role.count()
    i.list = list
    return i
  }

  async create(createClientDto: Role) {
    const data = createClientDto
    return await prisma.role.create({
      data: data,
    })
  }

  async update(updateClientDto: Role) {
    return await prisma.role.update({
      where: {
        id: updateClientDto.id,
      },
      data: updateClientDto,
    })
  }

  async remove(id: number) {
    return await prisma.role.delete({
      where: {
        id: id
      },
    })
  }

  async createDefult() {
    return await prisma.role.create({
      data: {
        id: 1,
        name: '管理员',
        content: '内容',
        remark: '备注',
      },
    })
  }
}
