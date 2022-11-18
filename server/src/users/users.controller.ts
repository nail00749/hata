import { Body, Controller, Get, Param, Patch, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestWithUser } from '../models/RequestWithUser.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/users.entity';
import { FileInterceptor } from '../interceptors/FileInterceptor';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/editFileName';


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
    return this.usersService.findById(id);
  }

  @Patch()
  updateProfile(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(updateUserDto as UserEntity);
  }

  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: 'dist/./src/static/avatars',
      filename: editFileName,
    }),
  }))
  @Patch('/avatar')
  updateAvatar(@Req() request: RequestWithUser,
               @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateAvatar(request.user, file.filename);
  }


}
