import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useGetBookingsForOwnerByApartmentQuery, useUpdateStatusBookingMutation } from '../../services/bookingAPI';
import DataTable from '../DataTable/DataTable';
import Select from 'react-select';
import { BookingStatus } from '../../models/BookingStatus';
import { localeBookingStatus } from '../../utils';
import { Button } from '../UI/Button/Button';
import { IBooking } from '../../models/IBooking';
import { IColDef } from '../../models/IColDef';
import { UserRatingModal } from '../Modals/UserRatingModal/UserRatingModal';
import { useToggle } from '../../hooks/useToggle';
import { useLazyGetRatingByUserQuery } from '../../services/userRatingAPI';

interface BookingsRequestsProps {
  apartmentId: string;
}

export const BookingsRequests: FC<BookingsRequestsProps> = ({ apartmentId }) => {
  const [status, setStatus] = useState<BookingStatus | null>(null);
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const { data } = useGetBookingsForOwnerByApartmentQuery(apartmentId);
  const [update, { isLoading, isSuccess }] = useUpdateStatusBookingMutation();
  const ref = useRef<IBooking | null>(null);
  const [showModal, setShowModal] = useToggle(false);
  const bookingRef = useRef<IBooking | null>(null);
  const [triggerRating] = useLazyGetRatingByUserQuery();

  const columns: IColDef<IBooking>[] = useMemo(() =>
    [
      {
        field: 'tenant.email',
        headerName: 'Email',
      },
      {
        field: 'status',
        headerName: 'Статус',
        renderCell: (prop, item) =>
          <div>
            {
              prop === BookingStatus.AWAITINGRATE ?
                <div
                  className = {'flex justify-center'}
                >
                  <Button
                    onClick = {() => {
                      setShowModal();
                      bookingRef.current = item;
                    }}
                  >
                    Поставить оценку
                  </Button>
                </div> :
                <Select
                  openMenuOnClick = {false}
                  options = {options}
                  onChange = {handlerSelect(item)}
                  defaultValue = {
                    Object.values(BookingStatus).map(item => ({
                      value: item,
                      label: localeBookingStatus(item),
                    })).find(p => p.value === prop)
                  }
                  isDisabled = {prop === BookingStatus.APPROVED || prop === BookingStatus.REJECT || prop === BookingStatus.ENDED}
                  placeholder = {'Обработайте запрос'}
                  isSearchable = {false}
                  isLoading = {isLoading}
                  styles = {{
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      zIndex: 20,
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: '100%',
                      /*height: '30px',*/
                    }),
                    valueContainer: (baseStyles, state) => ({
                      ...baseStyles,
                      width: '100%',
                      /*height: '30px',*/
                    }),
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      width: '100%',
                      /*height: '30px',*/
                    }),
                  }}
                />
            }
          </div>,
      },
      {
        field: 'startDate',
        headerName: 'С',
      },
      {
        field: 'endDate',
        headerName: 'По',
      },
      {
        field: '',
        headerName: 'Рейтинг',
        renderCell: (prop, item) =>
          <Button
            onClick = {() => {
              triggerRating(item.tenant.id)
            }}
          >
            Посмотреть рейтинг
          </Button>,

      },
    ], [isSuccess, bookings]);
  const options = useMemo(() => [
    { label: localeBookingStatus(BookingStatus.APPROVED), value: BookingStatus.APPROVED, isDisabled: false },
    { label: localeBookingStatus(BookingStatus.REJECT), value: BookingStatus.REJECT, isDisabled: false },
  ], []);

  useEffect(() => {
    if (data) {
      setBookings(data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setStatus(null);
    }
  }, [isSuccess]);

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
              <DataTable<IBooking>
                columns = {columns}
                rows = {bookings}
              /> : <div>Здесь будут запросы по бронированию</div>
          }
          {status &&
            <div
              className = 'flex justify-center m-2'
            >
              <Button
                onClick = {handlerUpdate}
                isLoading = {isLoading}
              >
                Обновить статус
              </Button>
            </div>
          }
        </>
      }
      <UserRatingModal
        open = {showModal}
        handlerVisible = {setShowModal}
        booking = {bookingRef.current}
      />
    </div>
  );
};
