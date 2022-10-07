import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserAuthDto } from '../users/dto/userAuthDto';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
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
    const tokens = await this.authService.login(userDto);
    /*response.setCookie('refreshToken', tokens.refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    response.serialize(tokens);*/
    response.send(tokens);
  }

  @Public()
  @Get('refresh')
  async refresh(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
    /*await this.authService.refreshToken(request.cookies['refreshToken']);
    response.setCookie('refreshToken', '', {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });*/
  }

  @Public()
  @Post('logout')
  async logout(@Res() response: FastifyReply) {
    /*await this.authService.logout(response.cookies['refreshToken']);
    response.clearCookie('refreshToken');*/
    return response.status(200);
  }

}
