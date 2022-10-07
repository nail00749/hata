import { Layout } from '../components/UI/Layout';
import { ReactElement } from 'react';
import { Filters } from '../components/Filters';


export default function Page() {

  return (
    <div
      className = 'flex '
    >
      <Filters />
      <div
        className = 'flex flex-wrap'
      >
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
