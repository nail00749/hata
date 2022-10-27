import { Layout } from '../components/UI/Layout';
import { ReactElement } from 'react';
import { Filters } from '../components/Filters';
import {
  getApartments,
  getRunningOperationPromises, useGetApartmentsQuery,
} from '../services/apartmentAPI';
import { wrapper } from '../store';
import { ApartmentsList } from '../components/Apartment/ApartmentsList';
import { Pagination } from '../components/Navigation/Pagination';
import { useRouter } from 'next/router';
import { apartmentPageSize } from '../constants/apartmentPageSize';

const Page = () => {
  const { query } = useRouter();
  const { data } = useGetApartmentsQuery({ skip: (Number(query.page) - 1) * 20, limit: apartmentPageSize });

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
    store.dispatch(getApartments.initiate({ skip: 0, limit: apartmentPageSize }));
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);
