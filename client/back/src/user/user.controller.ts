import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';


export interface userParams extends User {
  pageSize: number
  pageNum: number
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/list')
  login(@Body() parms: userParams) {
    return this.userService.getList(parms)
  }

}
