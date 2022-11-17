import { ReactElement } from 'react';
import { Layout } from '../../components/UI/Layout';
import { useGetProfileQuery } from '../../services/authAPI';

const Page = () => {
  const {data: user} = useGetProfileQuery()

  return (
    <div>
      <div
        className='relative'
      >

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

export default Page
