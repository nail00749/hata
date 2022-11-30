import { Module } from '@nestjs/common';
import { UserRatingService } from './user-rating.service';
import { UserRatingController } from './user-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRatingEntity } from './entities/user-rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRatingEntity])
  ],
  controllers: [UserRatingController],
  providers: [UserRatingService]
})
export class UserRatingModule {}
