import { Layout } from '../components/UI/Layout';
import { ReactElement } from 'react';
import { Filters } from '../components/Filters';
import { useGetApartmentsQuery } from '../services/apartmentAPI';
import { ApartmentCard } from '../components/Apartment/ApartmentCard';
import { IApartment } from '../models/IApartment';


export default function Page() {
  const {data} = useGetApartmentsQuery()


  return (
    <div
      className = 'flex '
    >
      <Filters />
      <div
        className = 'flex flex-wrap'
      >
        {
          data &&
          data.map((apartment: IApartment) =>
          <ApartmentCard
            apartment={apartment}
          />
          )
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

/*export const getServerSideProps = () => {

}*/
