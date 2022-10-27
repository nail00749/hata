import { FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactElement;
}

export const Portal: FC<PortalProps> = ({ children }) => {
  return createPortal(
    <div
      className = 'fixed z-40 inset-0 flex justify-center items-center  bg-translucentBlack'
    >
      {children}
    </div>,
    document.querySelector('#portal') as Element,
  );
};
