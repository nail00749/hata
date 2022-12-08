import { Module } from '@nestjs/common';
import { UserRatingService } from './user-rating.service';
import { UserRatingController } from './user-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRatingEntity } from './entities/user-rating.entity';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRatingEntity]),
    BookingsModule,
  ],
  controllers: [UserRatingController],
  providers: [UserRatingService],
  exports: [UserRatingService],
})
export class UserRatingModule {
}
