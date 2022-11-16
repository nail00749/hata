import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { useCreateBookingMutation } from '../../services/bookingAPI';
import { IBooking } from '../../models/IBooking';
import { Button } from '../UI/Button/Button';
import { differenceInCalendarDays } from 'date-fns';

const BookingCalendar = dynamic(() => import('../../components/Booking/BookingCalendar/BookingCalendar'), {
  ssr: false,
});

export type DateRange = [Date | null, Date | null]

interface BookingProps {
  apartmentId: string;
  dayPrice: number;
  busyDates: IBooking[];
}

export const Booking: FC<BookingProps> = ({ apartmentId, dayPrice, busyDates }) => {
  const [date, setDate] = useState<DateRange>([null, null]);
  const [create] = useCreateBookingMutation();

  const handlerBooking = () => {
    const price = differenceInCalendarDays(date[1]!, date[0]!) * dayPrice;
    const booking: IBooking = {
      startDate: date[0]!,
      endDate: date[1]!,
      price,
      apartment: apartmentId,
    };
    create(booking);
  };

  return (
    <div
      className = 'flex items-center'
    >
      <BookingCalendar
        date = {date}
        setDate = {setDate}
        busyDates={busyDates}
      />
      <div
        className = 'ml-2'
      >
        <Button
          onClick = {handlerBooking}
        >
          Забронировать
        </Button>
      </div>
    </div>
  );
};
