import { FC } from 'react';
import { useGetLastBookingQuery, useUpdateStatusBookingMutation } from '../../services/bookingAPI';
import { Button } from '../UI/Button/Button';
import { IBooking } from '../../models/IBooking';
import { BookingStatus } from '../../models/BookingStatus';

interface CurrentBookingProps {
  apartmentId: string;
}

export const CurrentBooking: FC<CurrentBookingProps> = ({ apartmentId }) => {
  const { data: booking } = useGetLastBookingQuery(apartmentId);
  const [update, { isLoading }] = useUpdateStatusBookingMutation();

  const handlerCancel = () => {
    if (booking) {
      const cancelBooking: Partial<IBooking> = {
        id: booking.id,
        status: BookingStatus.CANCEL,
      };
      update(cancelBooking);
    }
  };

  return (
    <>
      {
        booking &&
        <div
          /*className='col-span-1 sm:col-span-2'*/
        >
          <h1
            className = 'text-center font-bold text-xl m-2'
          >
            Моя бронь
          </h1>
          <div
            className = 'ml-2 mb-2'
          >
            <div>{`С ${booking.startDate}`}</div>
            <div>{`По ${booking.endDate}`}</div>
            <div>{`Статус: ${booking.status}`}</div>
            <div>{`Стоимость: ${booking.price}`}</div>
          </div>
          {
            (booking.status === BookingStatus.REQUEST || booking.status === BookingStatus.APPROVED) &&
            <Button
              variant = 'error'
              onClick = {handlerCancel}
              isLoading = {isLoading}
            >
              Отменить
            </Button>
          }
        </div>
      }
    </>
  );
};
