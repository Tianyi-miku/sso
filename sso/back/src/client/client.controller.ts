import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from '@prisma/client';

export interface clientParams extends Client {
  pageSize: number
  pageNum: number
}

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post('/create')
  create(@Req() req: any) {
    return this.clientService.create(req.user.id, req.body);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientService.update(+id, updateClientDto);
  // }

  @Delete(':id')
  remove(@Query('id') id: number) {
    return this.clientService.remove(+id);
  }


  @Post('/list')
  getlist(@Body() parms: clientParams) {
    return this.clientService.getList(parms)
  }

  @Post('/update')
  update(@Body() parms: Client) {
    return this.clientService.update(parms)
  }

}
