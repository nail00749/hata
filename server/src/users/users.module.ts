import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { AuthModule } from '../auth/auth.module';
import { TokenEntity } from '../tokens/entity/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
