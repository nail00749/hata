import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserAuthDto } from '../users/dto/userAuthDto';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { UsersService } from '../users/users.service';
import { Public } from '../decotarors/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  @Public()
  @Post('register')
  register(@Body() userDto: UserAuthDto) {
    return this.authService.register(userDto);
  }

  @Public()
  @Post('login')
  async login(@Body() userDto: UserAuthDto, @Res() response: FastifyReply) {
    const tokens = this.authService.login(userDto);
    //todo set cookie
    response.setCookie('refreshToken', '', {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return tokens;
  }

  @Public()
  @Get('refresh')
  async refresh(@Res() response: FastifyReply) {
    //todo set cookie
    await this.usersService.refreshToken(response.cookies['refreshToken']);
    response.setCookie('refreshToken', '', {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
  }

  @Public()
  @Post('logout')
  async logout(@Res() response: FastifyReply) {
    await this.usersService.logout('', response.cookies['refreshToken']);

    response.clearCookie('refreshToken');
    return response.status(200);
  }

}
