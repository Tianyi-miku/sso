import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { clientParams } from './client.controller';
import { prisma } from 'src/prisma';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  async create(id: number, createClientDto: Client) {
    const data = {
      ...createClientDto,
      userId: id
    }
    return await prisma.client.create({
      data: data,
    })
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async update(updateClientDto: Client) {
    return await prisma.client.update({
      where: {
        id: updateClientDto.id,
      },
      data: updateClientDto,
    })
  }

  async remove(id: number) {
    return await prisma.client.delete({
      where: {
        id: id
      },
    })
  }

  async getList(data: clientParams) {
    let i: any = {}
    let list = await prisma.client.findMany({
      skip: data.pageNum - 1,
      take: data.pageSize,
      where: {
        name: {
          contains: data.name
        }
      }
    })
    i.total = await prisma.client.count()
    i.list = list
    return i
  }
}
