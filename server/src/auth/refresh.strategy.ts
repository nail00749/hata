import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: any) => {
        let data = request.cookies['refreshToken'];
        if (!data) {
          return null;
        }
        return data;
      }]),
    });
  }

  async validate(request: FastifyRequest, payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const token = request.cookies['refreshToken']

    if(!token){
      throw new BadRequestException('no refresh token')
    }
    const isValid = await this.authService.validRefreshToken(token)
    if(!isValid) {
      throw new BadRequestException('token invalidated')
    }
    return payload
  }
}
