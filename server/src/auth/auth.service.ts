import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { verify } from '../helpers/hashing';
import { UserEntity } from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from '../users/dto/userAuthDto';
import { UserModel } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isComparePassword = verify(password, user.password);
      if (isComparePassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async register(userDto: UserAuthDto): Promise<UserModel> {
    const candidate = await this.usersService.findByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.FORBIDDEN);
    }

    return this.usersService.create(userDto);
  }

  async login(userDto: UserAuthDto) {
    const user = await this.validateUser(userDto.email, userDto.password) as UserEntity;
    if (!user) {
      throw new HttpException('Такого пользователя нет', HttpStatus.FORBIDDEN);
    }

    const tokens = this.generateToken(user as UserEntity);
    //user.refreshTokens.push(tokens.refresh_token);
    //await this.usersService.saveUser(user);
    return tokens;
  }

  generateToken(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '30d',
      }),
    };
  }

  validRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('Нет токена', HttpStatus.FORBIDDEN);
    }

    const userData = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    if (!userData) {
      throw new HttpException('Ошибка верификации токена', HttpStatus.NOT_FOUND);
    }

    const user = await this.usersService.findByEmail(userData.email);
    if (!user) {
      throw new HttpException('Нет такого пользователя', HttpStatus.NOT_FOUND);
    }

    const tokens = this.generateToken(user);
    const indexToken = user.refreshTokens.findIndex(t => t === refreshToken);
    /*if (indexToken === -1) {
      throw  new HttpException('Error refresh token', HttpStatus.NOT_FOUND);
    }*/
    /*user.refreshTokens[indexToken] = tokens.refresh_token;
    await this.usersService.saveUser(user);*/
    return tokens;
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('not found token', HttpStatus.NOT_FOUND);
    }

    const userData = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return this.usersService.removeToken(userData.sub, refreshToken);
  }


}
