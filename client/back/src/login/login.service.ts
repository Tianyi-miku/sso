import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { Register } from './login.controller';
import { prisma } from 'src/prisma';
import { JwtService } from '@nestjs/jwt';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ssoIp } from 'src/config/config';


@Injectable()
export class LoginService {

  constructor(private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) { }

  async login(token: string): Promise<any> {

    const url = ssoIp + `/getUserByToken?token=${token}`;
    const config: AxiosRequestConfig = {
      method: 'get',
      url,
      // 其他配置，如 headers, params 等  
    };
    const response = await this.httpService.request(config).toPromise();
    if (response.data.id) {
      let Iuser = await prisma.user.findUnique({
        where: {
          username: response.data.name,
          password: response.data.password
        }
      })
      if (!Iuser) {
        let { id, roleId, clientCode, ...user } = response.data
 
        await prisma.user.create({
          data: user
        })
      }
      const payload = {
        id: response.data.id,
        username: response.data.username
      };
      const access_token = await this.jwtService.signAsync(payload)
      return { access_token: access_token }
    }
    return;
  }

  async register(param: Register) {
    let Iuser = await prisma.user.findUnique({
      where: {
        username: param.username,
      }
    })
    if (Iuser) {
      return {
        msg: '名称已被注册'
      }
    } else {
      const { repetPassword, ...user } = param
      return await prisma.user.create({
        data: user
      })
    }
  }

}
