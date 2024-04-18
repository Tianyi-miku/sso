import { Body, Controller, Delete, Post, Query, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';


export interface roleParams extends Role {
  pageSize: number
  pageNum: number
}

@Controller('role')
export class RoleController {
  constructor(private readonly roleservie: RoleService) { }

  @Post('/list')
  login(@Body() parms: roleParams) {
    return this.roleservie.getList(parms)
  }

  @Post('/create')
  create(@Req() req: any) {
    return this.roleservie.create(req.body);
  }

  @Post('/update')
  update(@Body() parms: Role) {
    return this.roleservie.update(parms)
  }

  @Delete(':id')
  remove(@Query('id') id: number) {
    return this.roleservie.remove(+id);
  }

}
