import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HeaderModal } from './HeaderModal';

interface ModalProps {
  title: string;
  open: boolean;
  handlerVisible: () => void;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, title, open, handlerVisible }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return open ? createPortal(
    <div
      className = 'fixed z-10 inset-0 flex justify-center items-center  bg-translucentBlack'
      ref = {containerRef}
      //onClick = {handlerVisible}
    >
      <div
        className = 'bg-white opacity-100 min-h-[150px] min-w-[350px] text-black flex flex-col rounded-md flex flex-col '
      >
        <HeaderModal title = {title} handlerVisible = {handlerVisible} />
        <div
          className = 'pb-5'
        >
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('#portal') as Element) : null;
};
