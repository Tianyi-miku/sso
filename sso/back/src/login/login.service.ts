import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client'
import { Register } from './login.controller';
import { prisma } from 'src/prisma';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { CacheService } from 'src/redis/cache.serve';
import { LoginloggerService } from 'src/loginlogger/loginlogger.service';
import { CryptoService } from 'src/auth/cryptoService';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class LoginService {

  constructor(
    private jwtService: JwtService,
    private cacheService: CacheService,
    private LoginloggerService: LoginloggerService,
    private roleService: RoleService,

    private cryptoService: CryptoService) { }

  async login(user: User): Promise<any> {

    let Iuser = await prisma.user.findUnique({
      where: {
        username: user.username,
      }
    })

    if (Iuser) {
      let log: any = {
        userId: Iuser.id,
        controls: `登录失败`,
      }
      const Crpassword = await this.cryptoService.checkPassword(user.password, Iuser.password)
      if (!Crpassword) {
        await this.LoginloggerService.setloginLog(log)
        throw new HttpException('密码错误', HttpStatus.BAD_GATEWAY);
      }
      const payload = {
        id: Iuser.id,
        username: Iuser.username
      };
      const access_token = await this.jwtService.signAsync(payload)
      this.cacheService.set(access_token, payload.username)
      log.controls = '登录成功'
      await this.LoginloggerService.setloginLog(log)
      return { access_token: access_token }
    }
    throw new HttpException('用户名或密码错误', HttpStatus.BAD_GATEWAY);
  }

  async register(param: Register) {
    const isUsed = await prisma.user.findFirst({
      where: { username: param.username }
    })
    if (isUsed) {
      throw new HttpException('用户名已经使用', HttpStatus.BAD_GATEWAY);
    }
    let { repetPassword, ...data } = param
    data.password = await this.cryptoService.careatePassword(data.password)

    let IRole = await prisma.role.findUnique({
      where: {
        id: data.roleId
      }
    })
    if (!IRole) {
      await this.roleService.createDefult()
    }
    

    await prisma.user.create({ data: data })
    const users = await prisma.user.findMany()
    return users
  }


  async loginout(id: number, token: string) {
    let log: any = {
      userId: id,
      controls: `退出成功`,
    }
    await this.LoginloggerService.setloginLog(log)
    await this.cacheService.deleteKey(token)
    return true
  }

  async getUserByToken(token: string) {
    const user: any = await this.cacheService.get(token)
    if (!user) {
      throw new UnauthorizedException();
    }
    const data = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret
    })

    if (data.id) {
      return await prisma.user.findUnique({
        where: {
          id: data.id,
          username: data.username
        }
      })
    }
    throw new UnauthorizedException();
  }

}
