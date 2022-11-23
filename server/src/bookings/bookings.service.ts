import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entity/users.entity';
import { ApartmentEntity } from '../apartment/entities/apartment.entity';

@Injectable()
export class BookingsService {
  constructor(@InjectRepository(BookingEntity) private bookingRepository: Repository<BookingEntity>,
  ) {
  }

  async create(createBookingDto: CreateBookingDto, tenant: UserEntity) {
    let bookingEntity = new BookingEntity();
    let apartment = new ApartmentEntity();
    apartment.id = createBookingDto.apartment;
    bookingEntity = { ...bookingEntity, ...createBookingDto, tenant, apartment };

    const bookings = await this.bookingRepository.createQueryBuilder('booking')
      .where('booking.apartment = :apartment', { apartment: createBookingDto.apartment })
      .andWhere('booking.start_date <= :endDate', { endDate: createBookingDto.endDate })
      .andWhere('booking.end_date >= :startDate', { startDate: createBookingDto.startDate })
      .getMany();
    if (bookings && bookings.length) {
      throw new HttpException('Эта дата уже занята, попробуйте другую', HttpStatus.BAD_REQUEST);
    }
    return this.bookingRepository.save(bookingEntity);
  }

  findAll() {
    return this.bookingRepository.findBy({});
  }

  findMy(user: UserEntity) {
    return this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.apartment', 'apartment')
      .where('booking.tenant = :userId', { userId: user.id })
      .getMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
