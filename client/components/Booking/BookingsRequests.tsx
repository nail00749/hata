import { FC, useEffect, useRef, useState } from 'react';
import { useGetBookingsForOwnerByApartmentQuery, useUpdateStatusMutation } from '../../services/bookingAPI';
import DataTable from '../DataTable/DataTable';
import Select from 'react-select';
import { BookingStatus } from '../../models/BookingStatus';
import { colorForBookingStatus } from '../../utils';
import { Button } from '../UI/Button/Button';
import { IBooking } from '../../models/IBooking';

interface BookingsRequestsProps {
  apartmentId: string;
}

export const BookingsRequests: FC<BookingsRequestsProps> = ({ apartmentId }) => {
  const [status, setStatus] = useState<BookingStatus | null>(null);
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const { data } = useGetBookingsForOwnerByApartmentQuery(apartmentId);
  const [update, {}] = useUpdateStatusMutation();
  const ref = useRef<IBooking | null>(null);

  useEffect(() => {
    if (data) {
      setBookings(data);
    }
  }, [data]);

  const options = Object.values(BookingStatus).map(item => ({
    value: item,
    label: item,
    isDisabled: item === 'request' || item === 'ended',
  }));

  const handlerSelect = (item: any) => (e: any) => {
    if (bookings) {
      const updatedBookings = bookings.map(booking => {
        if (booking.id === item.id) {
          return { ...booking, status: e.value };
        }
        return booking;
      });
      setBookings(updatedBookings);
      setStatus(e.value);
      ref.current = item;
    }

  };

  const handlerUpdate = () => {
    if (ref.current) {
      const data: Partial<IBooking> = {
        id: ref.current.id,
        status: status!,
      };

      update(data);
    }

  };

  return (
    <div
      className = 'sm:col-span-2'
    >
      {
        bookings &&
        <>
          {
            bookings.length ?
              <DataTable
                titles = {['Пользователь', 'Статус', 'С', 'По']}
                data = {bookings}
                properties = {['tenant.email', 'status', 'startDate', 'endDate']}
                renderItems = {[
                  {
                    prop: 'status',
                    renderFn: (prop: any, item: any) =>
                      <div>
                        <Select
                          onChange = {handlerSelect(item)}
                          options = {options}
                          value = {options.filter(o => o.label === prop)}
                          placeholder = {'Обработайте запрос'}
                          styles = {{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              width: '100%',
                            }),
                            option: (baseStyles, { data }) => ({
                              ...baseStyles,
                              color: colorForBookingStatus(data.value),
                            }),
                            menu: (baseStyles, state) => ({
                              ...baseStyles,
                              zIndex: 20,
                              /*height: '3rem',*/
                            }),
                            singleValue: (baseStyles, { data }) => ({
                              ...baseStyles,
                              color: colorForBookingStatus(data.value),
                            }),
                          }}
                        />
                      </div>,
                  },
                ]}
              /> : <div>Здесь будут запросы по бронированию</div>
          }
          {status &&
            <div
              className = 'flex justify-center m-2'
            >
              <Button
                onClick = {handlerUpdate}
              >
                Обновить статус
              </Button>
            </div>
          }
        </>
      }
    </div>
  );
};
