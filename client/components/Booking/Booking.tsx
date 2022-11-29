import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { useCreateBookingMutation } from '../../services/bookingAPI';
import { IBooking } from '../../models/IBooking';
import { Button } from '../UI/Button/Button';
import { differenceInCalendarDays, addDays } from 'date-fns';
import { GetContactsOwner } from './GetContactsOwner';
import { IApartment } from '../../models/IApartment';
import { useAppDispatch } from '../../hooks/redux';
import { showAlert } from '../../store/slices/AlertSlice';

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
  const [price, setPrice] = useState(0);
  const [create, { isSuccess }] = useCreateBookingMutation();
  const dispath = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispath(showAlert({text: 'Ваш запрос отправлен', variant: 'success'}));
    }
  }, [isSuccess]);

  useEffect(() => {
    const p = differenceInCalendarDays(addDays(date[1]!, 1), date[0]!) * dayPrice;
    setPrice(p)
  }, [date]);

  const handlerBooking = () => {
    const booking: Partial<IBooking> = {
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
      className = 'flex flex-wrap items-center sm:col-span-2'
    >
      <BookingCalendar
        date = {date}
        setDate = {setDate}
        busyDates = {busyDates}
      />
      <div
        className='flex flex-wrap'
      >
        <div
          className = 'm-2'
        >
          <Button
            onClick = {handlerBooking}
          >
            Забронировать
          </Button>
          {
            !isNaN(price) &&
            <div>{`Ваша стоимость: ${price}`}</div>
          }
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
    </div>
  );
};
