import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import animationStyles from './animation.module.scss';
import { HeaderModal } from './HeaderModal';
import { CSSTransition } from 'react-transition-group';

interface LayoutProps {
  children: ReactNode;
  title: string,
  handlerVisible: () => void
  open: boolean
}

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};

export const Layout: FC<LayoutProps> = ({ children, title, handlerVisible, open }) => {
  const [animationIn, setAnimationIn] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setAnimationIn(open);
  }, [open]);

  return (
    <>
      <CSSTransition
        in = {animationIn}
        nodeRef = {modalRef}
        timeout = {500}
        mountOnEnter
        unmountOnExit
        classNames = {overlayAnimation}
      >
        <div
          className = 'bg-white min-h-[150px] min-w-[350px] text-black flex flex-col rounded-md flex flex-col '
          ref = {modalRef}
        >
          <HeaderModal title = {title} handlerVisible = {handlerVisible} />
          <div
            className = 'pb-5'
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
