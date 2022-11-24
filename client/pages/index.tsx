import { Layout } from '../components/UI/Layout';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { Filters } from '../components/Filters';
import {
  apartmentAPI,
  getApartments,
  useGetApartmentsQuery,
} from '../services/apartmentAPI';
import { wrapper } from '../store';
import { ApartmentsList } from '../components/Apartment/ApartmentsList';
import { NextPage } from 'next';

interface Props {
  count: number;
}

const Page: NextPage<Props> = ({ count }) => {
  const loader = useRef<HTMLDivElement | null>(null);
  const ref = useRef(count);
  const [filters, setFilters] = useState({ minPrice: undefined, maxPrice: undefined });
  const { data, refetch } = useGetApartmentsQuery({
    skip: ref.current,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });
  useEffect(() => {
    if (data) {
      ref.current = data.length;
    }
  }, [data]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(handlerInterSection, options);
    if (loader.current) {
      observer.observe(loader.current!);
    }
  }, []);

  const handlerInterSection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        refetch();
      }
    });
  };

  /*const handlerFilters = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    ref.current = 0;
  };*/

  return (
    <div
      className = 'flex flex-auto'
    >
      {/*<Filters
        filters = {filters}
        handlerFilters = {handlerFilters}
      />*/}
      <div
        className = 'flex flex-col flex-wrap justify-between flex-[1_1_100%]'
      >
        {
          data &&
          <>
            <ApartmentsList
              apartments = {data}
            />
            {
              data &&
              <div
                ref = {loader}
              />
            }
            {/*<Pagination
              allCount = {data.allCount}
            />*/}
          </>
        }
      </div>
    </div>
  );
};

// @ts-ignore
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) => async () => {
    const result = await dispatch(getApartments.initiate({ skip: 0 }));
    // @ts-ignore
    await Promise.all(dispatch(apartmentAPI.util.getRunningQueriesThunk()));

    return {
      props: {
        // @ts-ignore
        count: result?.data?.length || 0,
      },
    };
  },
);
