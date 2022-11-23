import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RequestWithUser } from '../models/RequestWithUser.interface';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {
  }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Req() request: RequestWithUser) {
    return this.bookingsService.create(createBookingDto, request.user);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('my')
  findMy(@Req() request: RequestWithUser) {
    return this.bookingsService.findMy(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
