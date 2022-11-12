import { IsDate } from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  apartment: string;
}
