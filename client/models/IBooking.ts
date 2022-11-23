export interface IBooking {
  id?: string;
  startDate: Date;
  endDate: Date;
  price: number;
  tenant?: string;
  apartment?: IBooking | string;
}
