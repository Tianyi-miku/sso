import { Body, Controller, Post, UsePipes, ValidationPipe, Param, Get, Query, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from '@prisma/client';
import { Public } from 'src/auth/constants';

export interface Register extends User {
  repetPassword?: string
}


@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Public()
  @Post('/login')
  login(@Body() user: User) {
    return this.loginService.login(user);
  }

  @Public()
  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() param: Register) {
    if (param.password !== param.repetPassword) {
      return '密码不一致'
    }
    return this.loginService.register(param);
  }

  @Get('/loginout')
  loginOut(@Req() param: any) {
    return this.loginService.loginout(param.user, param)
  }

  @Public()
  @Get('/getUserByToken')
  getUser(@Query('token') token: string) {
    return this.loginService.getUserByToken(token)
  }

}
