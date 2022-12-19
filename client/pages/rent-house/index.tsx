import React, { ReactElement } from 'react';
import { Layout } from '../../components/UI/Layout/Layout';
import dynamic from 'next/dynamic';
import { RentType } from '../../components/Rent/RentType';
import { InfoRent } from '../../components/Rent/InfoRent';
import { Comforts } from '../../components/Rent/Comforts';
import { SubmitRent } from '../../components/Rent/SubmitRent';


const Map = dynamic(() => import('../../components/Map/MapRent'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Page() {

  return (
    <div
      className = 'p-5'
    >
      <RentType />
      <Map />
      <InfoRent />
      <Comforts />
      <SubmitRent/>
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
