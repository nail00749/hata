import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entity/users.entity';
import { ApartmentEntity } from '../apartment/entities/apartment.entity';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '../models';

@Injectable()
export class BookingsService {
  constructor(@InjectRepository(BookingEntity) private bookingRepository: Repository<BookingEntity>,
  ) {
  }

  async create(createBookingDto: CreateBookingDto, tenant: UserEntity) {
    const myBookings = await this.bookingRepository.createQueryBuilder('booking')
      .where('booking.status = :status', { status: BookingStatus.REQUEST })
      .andWhere('booking.tenant = :userId', { userId: tenant.id })
      .getMany();

    if (myBookings && myBookings.length) {
      throw new HttpException('У вас уже есть бронь', HttpStatus.BAD_REQUEST);
    }

    const bookings = await this.bookingRepository.createQueryBuilder('booking')
      .where('booking.apartment = :apartment', { apartment: createBookingDto.apartment })
      .andWhere('booking.start_date <= :endDate', { endDate: createBookingDto.endDate })
      .andWhere('booking.end_date >= :startDate', { startDate: createBookingDto.startDate })
      .getMany();

    if (bookings && bookings.length) {
      throw new HttpException('Эта дата уже занята, попробуйте другую', HttpStatus.BAD_REQUEST);
    }

    let bookingEntity = new BookingEntity();
    let apartment = new ApartmentEntity();
    apartment.id = createBookingDto.apartment;
    bookingEntity = { ...bookingEntity, ...createBookingDto, tenant, apartment };

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

  findForOwner(apartmentId: string) {
    return this.bookingRepository.createQueryBuilder('booking')
      /*.orderBy('booking.start_date', 'ASC')*/
      .leftJoinAndSelect('booking.tenant', 'user')
      .where('booking.apartment = :id', { id: apartmentId })
      .take(20)
      .getMany();
  }

  findCurrentBooking(apartmentId: string, user: UserEntity) {
    return this.bookingRepository.createQueryBuilder('booking')
      .where('booking.tenant = :user', { user: user.id })
      .andWhere('booking.apartment = :apartmentId', { apartmentId })
      .andWhere('booking.status != :status', { status: BookingStatus.ENDED })
      .orderBy('booking.start_date', 'ASC')
      .getOne();
  }

  @Cron('0 0 0 * * *')
  private bookingChecks(): void {
    this.bookingRepository.createQueryBuilder('booking')
      .update()
      .set({
        status: BookingStatus.EXPIRED,
      })
      .where('booking.startDate > :date', { date: new Date() })
      .andWhere('booking.status = :status', { status: BookingStatus.REQUEST })
      .execute();
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingRepository.update(id, { ...updateBookingDto });
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
