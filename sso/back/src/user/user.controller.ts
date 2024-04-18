import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
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

  @Post('/update')
  update(@Body() parms: User) {
    return this.userService.update(parms)
  }

  @Delete(':id')
  remove(@Query('id') id: number) {
    return this.userService.remove(+id);
  }


}
