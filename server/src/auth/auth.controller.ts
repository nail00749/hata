import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserAuthDto } from '../users/dto/userAuthDto';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersService } from '../users/users.service';
import { Public } from '../decotarors/public.decorator';
import { RequestWithUser } from '../models/RequestWithUser.interface';

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
    //todo secure true if https
    response.setCookie('refreshToken', tokens.refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    });
    response.send(tokens);
  }

  @Public()
  @Get('refresh')
  refresh(@Req() request: FastifyRequest) {
    return this.authService.refreshToken(request.cookies['refreshToken']);
  }

  @Public()
  @Get('logout')
  async logout(@Res() response: FastifyReply) {
    //await this.authService.logout(response.cookies['refreshToken']);
    response.clearCookie('refreshToken',
      {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
      },
    );
    response.status(200).send();
  }

  @Get('send-mail')
  sendConfirmation(@Req() request: RequestWithUser) {
    return this.authService.sendCode(request.user);
  }

  @Public()
  @Get('activate')
  confirmEmail() {

  }

}
