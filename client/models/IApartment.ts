import { IBooking } from './IBooking';
import { IUser } from './IUser';

export interface IApartment {
  id: string;
  title: string;
  rentType: string;
  countRooms: number;
  price: number;
  currency: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  images: string[];
  houseArea: number;
  comforts: string[];
  owner?: IUser;
  bookings?: IBooking[]
}

export type IApartmentCreate = Omit<IApartment, 'images'> & { images: FileList | undefined | null }

