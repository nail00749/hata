import { Layout } from '../components/UI/Layout';
import { ReactElement } from 'react';
import { IApartment } from '../models/IApartment';
import { ApartmentCard } from '../components/Apartment/ApartmentCard';
import { Filters } from '../components/Filters';

export default function Page() {
  const arrCard: IApartment[] = [
    {
      title: 'home 1',
      price: '1000',
    },
    {
      title: 'home 2',
      price: '2000',
    },
    {
      title: 'home 3',
      price: '3000',
    },
    {
      title: 'home 4',
      price: '4000',
    },
    {
      title: 'home 5',
      price: '5000',
    },
    {
      title: 'home 6',
      price: '6000',
    },
  ];

  return (
    <div
      className = 'flex '
    >
      <Filters />
      <div
        className = 'flex flex-wrap'
      >
        {
          arrCard.map((item) => (
            <ApartmentCard key = {item.price} apartment = {item} />
          ))
        }
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
