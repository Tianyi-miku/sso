import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Page } from 'src/prisma';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/list')
  login(@Body() parms: Page) {
    return this.userService.getList(parms)
  }

}
