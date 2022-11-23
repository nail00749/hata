import React from 'react';
import { Layout } from '../../components/UI/Layout';
import { useGetMyBookingsQuery } from '../../services/bookingAPI';
import { ApartmentCard } from '../../components/Apartment/ApartmentCard';
import { IApartment } from '../../models/IApartment';

const Page = () => {
  const { data: bookings } = useGetMyBookingsQuery();

  return (
    <Layout>
      <h1
        className = 'text-2xl text-center font-bold'
      >
        Мои бронирования
      </h1>
      <div
        className = 'flex flex-wrap'
      >
        {
          bookings &&
          bookings.map(booking =>
            <ApartmentCard
              apartment = {booking.apartment as unknown as IApartment}
            />,
          )
        }
      </div>
    </Layout>
  );
};

export default Page;
