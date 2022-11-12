import { ReactNode } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Alert } from './Alert';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main
        className='flex flex-col flex-auto'
      >
        {children}
      </main>
      <Alert/>
      <div id = 'portal' />
    </>
  );
};
