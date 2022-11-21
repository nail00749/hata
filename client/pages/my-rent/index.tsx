import React from 'react';
import { Layout } from '../../components/UI/Layout';
import { useGetMyApartmentsQuery } from '../../services/apartmentAPI';

const Page = () => {
  const { data } = useGetMyApartmentsQuery();
  console.log(data);
  return (
    <Layout>

    </Layout>
  );
};

export default Page;
