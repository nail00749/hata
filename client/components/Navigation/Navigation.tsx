import { AuthModal } from '../Modals/AuthModal';
import { LoginMenu } from '../Account/LoginMenu';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { initState } from '../../store/slices/AuthSlice';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

export const Navigation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(initState());
    }, 100);
  }, []);

  return (
    <header
      className = 'h-20 '
    >
      <nav
        className = 'flex justify-between items-center p-3 shadow-lg rounded-b-md 2xl:px-80'
      >
        <DesktopMenu />
        <MobileMenu />
        <LoginMenu />
      </nav>
      <AuthModal />
    </header>
  );
};
