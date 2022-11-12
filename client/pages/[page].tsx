import { Layout } from '../components/UI/Layout';
import { ReactElement, useEffect } from 'react';
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
  const { query, ...router } = useRouter();
  const { data } = useGetApartmentsQuery({ skip: (Number(query.page) - 1) * 20, limit: apartmentPageSize });

  useEffect(() => {
    if(!data) {
      router.push('/')
    }
  }, []);

  return (
    <div
      className = 'flex flex-auto'
    >
      <Filters />
      <div
        className = 'flex flex-col flex-wrap justify-between flex-[1_1_100%]'
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
