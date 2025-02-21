import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserService } from './users.service';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers(){
    return await this.userService.getUsers();
  }

  @Post('create')
  createUser(@Body('nombre') nombre: string, @Body('telefono') telefono: string) {
    return this.userService.createUser(nombre, telefono);
  }

  @Post(':id/invite')
  inviteGuest(
    @Param('id') id: number,
    @Body('nombre') nombre: string,
  ) {
    return this.userService.inviteGuest(Number(id), nombre);
  }
}
