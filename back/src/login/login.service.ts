import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { Register } from './login.controller';
import { prisma } from 'src/prisma';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginService {

  constructor(private jwtService: JwtService) { }

  async login(user: User): Promise<any> {
    let Iuser = await prisma.user.findFirst({
      where: {
        name: user.name,
        password: user.password
      }
    });
    if (Iuser) {
      const payload = { id: Iuser.id, username: Iuser.name };
      return { access_token: await this.jwtService.signAsync(payload) }
    }
    return
  }

  async register(param: Register) {
    const isUsed = await prisma.user.findFirst({
      where: { name: param.name }
    })
    if (isUsed) {
      return '这个用户名已经使用'
    }
    let { repetPassword, ...data } = param
    await prisma.user.create({ data: data })
    const users = await prisma.user.findMany()
    return users
  }

}
