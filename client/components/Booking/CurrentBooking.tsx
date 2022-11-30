import { FC } from 'react';
import { useGetLastBookingQuery } from '../../services/bookingAPI';

interface CurrentBookingProps {
  apartmentId: string;
}

export const CurrentBooking: FC<CurrentBookingProps> = ({ apartmentId }) => {
  const { data } = useGetLastBookingQuery(apartmentId);

  return (
    <>
      {
        data &&
        <div
          /*className='col-span-1 sm:col-span-2'*/
        >
          <h1
            className = 'text-center font-bold text-xl m-2'
          >
            Моя бронь
          </h1>
          <div
            className = 'ml-2'
          >
            <div>{`С ${data.startDate}`}</div>
            <div>{`По ${data.endDate}`}</div>
            <div>{`Статус: ${data.status}`}</div>
            <div>{`Стоимость: ${data.price}`}</div>
          </div>
        </div>
      }
    </>
  );
};
