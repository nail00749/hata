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

    const newUser = await this.usersService.create(userDto);
    return newUser;
  }

  async login(userDto: UserAuthDto) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN);
    }

    const token = this.generateToken(user as UserEntity);
    return token;
  }

  generateToken(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
    };
  }


}
