import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from '@prisma/client';
import { Public } from 'src/auth/constants';

export interface Register extends User {
  repetPassword?: string
}

@Public()
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('/login')
  login(@Body() user: User) {
    return this.loginService.login(user);
  }

  @Post('/register')
  register(@Body() param: Register) {
    if (param.password !== param.repetPassword) {
      return '密码不一致'
    }
    return this.loginService.register(param);
  }
}
