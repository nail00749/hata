import React, { ReactElement } from 'react';
import { Layout } from '../../components/UI/Layout';
import { getOneApartment, getRunningOperationPromises, useGetOneApartmentQuery } from '../../services/apartmentAPI';
import { useRouter } from 'next/router';
import { wrapper } from '../../store';
import { CarouselImages } from '../../components/Apartment/CarouselImages';
import { ApartmentHeader } from '../../components/Apartment/ApartmentHeader';
import { ApartmentInfo } from '../../components/Apartment/ApartmentInfo';
import { ApartmentComforts } from '../../components/Apartment/ApartmentComforts';
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';
import { Booking } from '../../components/Booking/Booking';

const MapInfo = dynamic(() => import('../../components/Map/MapInfo'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});



const Apartment = () => {
  const { query } = useRouter();
  const { data: apartment } = useGetOneApartmentQuery(String(query.id));

  return (
    <div
      className = 'p-5 '
    >
      {
        apartment &&
        <div
          className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3'
        >
          <ApartmentHeader
            title = {apartment.title}
            price = {apartment.price}
          />
          <CarouselImages
            images = {apartment.images}
          />
          <ApartmentInfo
            apartment = {apartment}
          />
          <ApartmentComforts
            comforts = {apartment.comforts}
          />
          <MapInfo
            position = {apartment.coordinates as LatLng}
          />
          <Booking
            apartmentId = {String(query.id)}
            dayPrice = {apartment.price}
            busyDates={apartment.bookings!}
          />
        </div>
      }
    </div>
  );
};

Apartment.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Apartment;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params }) => {
    store.dispatch(getOneApartment.initiate(String(params?.id)));
    await Promise.all(getRunningOperationPromises());
    return {
      props: {},
    };
  },
);
