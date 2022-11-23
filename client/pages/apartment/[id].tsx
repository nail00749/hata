import React, { ReactElement } from 'react';
import { Layout } from '../../components/UI/Layout';
import {
  apartmentAPI,
  getOneApartment,
  useGetOneApartmentQuery,
} from '../../services/apartmentAPI';
import { useRouter } from 'next/router';
import { wrapper } from '../../store';
import { CarouselImages } from '../../components/Apartment/CarouselImages';
import { ApartmentHeader } from '../../components/Apartment/ApartmentHeader';
import { ApartmentInfo } from '../../components/Apartment/ApartmentInfo';
import { ApartmentComforts } from '../../components/Apartment/ApartmentComforts';
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';
import { Booking } from '../../components/Booking/Booking';
import { useGetProfileQuery } from '../../services/authAPI';
import { OwnerButtons } from '../../components/Apartment/OwnerButtons';

const MapInfo = dynamic(() => import('../../components/Map/MapInfo'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});


const Apartment = () => {
  const { query } = useRouter();
  const { data: apartment } = useGetOneApartmentQuery(String(query.id));
  const { data: user } = useGetProfileQuery();
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
          {
            (user && user.id === apartment?.owner?.id) ?
              <OwnerButtons
                apartment = {apartment}
              /> :
              <Booking
                apartment = {apartment}
                dayPrice = {apartment.price}
                busyDates = {apartment.bookings!}
              />
          }
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
  ({ dispatch }) => async ({ params }) => {
    dispatch(getOneApartment.initiate(String(params?.id)));
    // @ts-ignore
    await Promise.all(dispatch(apartmentAPI.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  },
);
