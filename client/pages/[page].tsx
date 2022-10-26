import { Layout } from '../components/UI/Layout';
import { ReactElement } from 'react';
import { Filters } from '../components/Filters';
import {
  getApartments,
  getRunningOperationPromises, useGetApartmentsQuery,
} from '../services/apartmentAPI';
import { wrapper } from '../store';
import { ApartmentsList } from '../components/Apartment/ApartmentsList';
import { Pagination } from '../components/UI/Pagination';
import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  const { data } = useGetApartmentsQuery({ skip: (Number(query.page) - 1) * 20, limit: 20 });

  return (
    <div
      className = 'flex '
    >
      <Filters />
      <div
        className = 'flex flex-col flex-wrap items-center'
      >
        {
          data &&
          <>
            <ApartmentsList
              apartments = {data.apartments}
            />
            <Pagination
              allCount = {data.allCount}
            />
          </>
        }
      </div>
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

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (params) => {
    store.dispatch(getApartments.initiate({ skip: 0, limit: 2 }));
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);
