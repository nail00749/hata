import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UserModel } from './user.model';
import { hash } from '../helpers/hashing';
import { UserAuthDto } from './dto/userAuthDto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userDto: UserAuthDto): Promise<UserModel> {
    const hashPassword = hash(userDto.password);
    const newUser = new UserEntity();
    newUser.email = userDto.email;
    newUser.password = hashPassword;
    await this.userRepository.save(newUser);
    return new UserModel(newUser);
  }

  async getMeInfo(userId: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return new UserModel(user);
  }

  async logout(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.tokenEntity.refreshTokens = user.tokenEntity.refreshTokens.filter(token => token !== refreshToken);
    await this.userRepository.save(user);
  }

  async refreshToken(refreshToken: string) {
      //validate refresh token
      const isValidToken = false
      const tokenFromDB = 'token'

      if(!isValidToken || !tokenFromDB) {
        throw new UnauthorizedException()
      }



  }

}
