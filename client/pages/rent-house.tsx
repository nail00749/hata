import React, { ReactElement } from 'react';
import { Layout } from '../components/UI/Layout';
import dynamic from 'next/dynamic';
import { RentType } from '../components/Rent/RentType';
import { InfoRent } from '../components/Rent/InfoRent';
import { Button } from '../components/UI/Button';


const Map = dynamic(() => import('../components/Map/Map'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Page() {

  return (
    <div
      className = 'p-5'
    >
      <RentType />
      <Map/>
      <InfoRent/>
    </div>
  );
};


Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
