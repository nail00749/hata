import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Alert } from './Alert';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main>
        {children}
      </main>
      <Alert/>
      <div id = 'portal' />

    </>
  );
};
