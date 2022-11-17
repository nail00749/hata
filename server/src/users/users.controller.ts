import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestWithUser } from '../models/RequestWithUser.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  getAll() {
    return 'Hello users';
  }

  @Get('/profile')
  getProfile(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id)
  }
}
