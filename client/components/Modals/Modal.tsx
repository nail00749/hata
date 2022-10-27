import React, { ReactNode } from 'react';
import { Portal } from './Portal';
import { useMount } from '../../hooks/useMount';

import { Layout } from './Layout';

interface ModalProps {
  title: string;
  open: boolean;
  handlerVisible: () => void;
  children: ReactNode;
}


export const Modal: React.FC<ModalProps> = ({ children, title, open, handlerVisible }) => {
  const { mounted } = useMount(open);


  if (!mounted) {
    return null;
  }


  return (
    <Portal>
      <Layout
        title = {title}
        handlerVisible = {handlerVisible}
        open = {open}
      >
        {children}
      </Layout>
    </Portal>
  );


};
