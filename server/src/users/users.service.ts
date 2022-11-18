import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UserModel } from './user.model';
import { hash } from '../helpers/hashing';
import { UserAuthDto } from './dto/userAuthDto';
import { TokenEntity } from '../tokens/entity/token.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
              @InjectRepository(TokenEntity) private tokenRepository: Repository<TokenEntity>,
  ) {
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
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

  async removeToken(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await this.userRepository.save(user);
    return HttpStatus.OK;
  }

  saveUser(user: UserEntity) {
    return this.userRepository.save(user);
  }

  updateProfile(user: UserEntity) {
    return this.userRepository.update({
      id: user.id,
    }, user);
  }

  updateAvatar(user: UserEntity, pathAvatar: string) {
    return this.userRepository.update({
        id: user.id,
      },
      {
        avatar: `avatars/${pathAvatar}`
      }
    );
  }

}
