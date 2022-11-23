import React from 'react';
import { Layout } from '../../components/UI/Layout';
import { useGetMyApartmentsQuery } from '../../services/apartmentAPI';
import { ApartmentCard } from '../../components/Apartment/ApartmentCard';

const Page = () => {
  const { data: apartments } = useGetMyApartmentsQuery();

  return (
    <Layout>
      <h1
        className = 'text-center font-extrabold text-2xl m-2'
      >
        Мои объявления
      </h1>
      <div
        className = 'flex flex-wrap m-2'
      >
        {
          apartments &&
          apartments.map(apartment =>
            <ApartmentCard
              key = {apartment.id!}
              apartment = {apartment}
            />,
          )
        }
      </div>
    </Layout>
  );
};

export default Page;
