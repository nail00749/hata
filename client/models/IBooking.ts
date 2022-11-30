import { BookingStatus } from './BookingStatus';
import { IUser } from './IUser';
import { IApartment } from './IApartment';

export interface IBooking {
  id: string;
  startDate: Date;
  endDate: Date;
  price: number;
  tenant?: string | IUser;
  apartment?: IApartment | string;
  status: BookingStatus;
}
