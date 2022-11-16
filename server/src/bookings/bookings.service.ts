import { Injectable } from '@nestjs/common';
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

  create(createBookingDto: CreateBookingDto, tenant: UserEntity) {
    let bookingEntity = new BookingEntity();
    let apartment = new ApartmentEntity();
    apartment.id = createBookingDto.apartment;
    bookingEntity = { ...bookingEntity, ...createBookingDto, tenant, apartment };

    return this.bookingRepository.save(bookingEntity);
  }

  findAll() {
    return this.bookingRepository.findBy({})
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
