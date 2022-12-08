import { Injectable } from '@nestjs/common';
import { CreateUserRatingDto } from './dto/create-user-rating.dto';
import { UpdateUserRatingDto } from './dto/update-user-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRatingEntity } from './entities/user-rating.entity';
import { Repository } from 'typeorm';
import { BookingEntity } from '../bookings/entities/booking.entity';
import { BookingsService } from '../bookings/bookings.service';
import { BookingStatus } from '../models';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserRatingService {
  constructor(
    @InjectRepository(UserRatingEntity) private userRatingRepository: Repository<UserRatingEntity>,
    private bookingService: BookingsService,
  ) {
  }

  async create(createUserRatingDto: CreateUserRatingDto) {
    let userRating = new UserRatingEntity();
    let booking = new BookingEntity();
    booking.id = createUserRatingDto.booking;
    userRating = { ...userRating, ...createUserRatingDto, booking };
    await this.bookingService.update(booking.id, { status: BookingStatus.ENDED });
    return this.userRatingRepository.save(userRating);
  }

  findAll() {
    return `This action returns all userRating`;
  }

  async findByUser(id: string) {
    const avg = await this.userRatingRepository.createQueryBuilder('x')
      .where('x.user = :id', { id })
      .select('AVG(rating)', 'avg')
      .take(20)
      .getRawOne();

    const rates = await this.userRatingRepository.createQueryBuilder('rate')
      .where('rate.user = :id', { id })
      .take(20)
      .getMany();

    return { rates, ...avg };
  }

  findOne(id: string) {
    return `This action returns a #${id} userRating`;
  }

  update(id: string, updateUserRatingDto: UpdateUserRatingDto) {
    return `This action updates a #${id} userRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRating`;
  }

}
