import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { useCreateBookingMutation } from '../../services/bookingAPI';
import { IBooking } from '../../models/IBooking';
import { Button } from '../UI/Button/Button';
import { differenceInCalendarDays } from 'date-fns';
import { GetContactsOwner } from './GetContactsOwner';
import { IApartment } from '../../models/IApartment';

const BookingCalendar = dynamic(() => import('../../components/Booking/BookingCalendar/BookingCalendar'), {
  ssr: false,
});

export type DateRange = [Date | null, Date | null]

interface BookingProps {
  apartment: IApartment;
  dayPrice: number;
  busyDates: IBooking[];
}

export const Booking: FC<BookingProps> = ({ apartment, dayPrice, busyDates }) => {
  const [showContacts, setShowContacts] = useState(false);
  const [date, setDate] = useState<DateRange>([null, null]);
  const [create] = useCreateBookingMutation();

  const handlerBooking = () => {
    const price = differenceInCalendarDays(date[1]!, date[0]!) * dayPrice;
    const booking: IBooking = {
      startDate: date[0]!,
      endDate: date[1]!,
      price,
      apartment: apartment.id,
    };
    create(booking);
  };

  const handlerShowContacts = () => setShowContacts(true);

  return (
    <div
      className = 'flex items-center sm:col-span-2'
    >
      <BookingCalendar
        date = {date}
        setDate = {setDate}
        busyDates = {busyDates}
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
      <div
        className = 'm-2 flex'
      >
        {
          showContacts ?
            <GetContactsOwner
              owner = {apartment.owner!}
            /> :
            <Button
              onClick = {handlerShowContacts}
            >
              Посмотреть контакты
            </Button>
        }
      </div>
    </div>
  );
};
