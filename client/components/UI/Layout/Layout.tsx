import { ReactNode } from 'react';
import { Navigation } from '../../Navigation/Navigation';
import { Alert } from '../Alert/Alert';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main
        className='flex flex-col flex-auto p-2 2xl:px-80'
      >
        {children}
      </main>
      <Alert/>
      <div id = 'portal' />
    </>
  );
};
