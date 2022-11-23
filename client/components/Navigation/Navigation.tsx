import Link from 'next/link';
import { navigationLinks } from '../../routing/routing';
import { AuthModal } from '../Modals/AuthModal';
import { LoginMenu } from '../Account/LoginMenu';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { initState } from '../../store/slices/AuthSlice';

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
        className = 'flex justify-between items-center p-3 shadow-lg rounded-b-md '
      >
        <ul
          className = 'flex '
        >
          {
            navigationLinks.map((route) =>
              <li
                className = 'ml-3'
                key = {route.href}
              >
                <Link href = {route.href}>
                  {route.title}
                </Link>
              </li>,
            )
          }
        </ul>
        <LoginMenu />
      </nav>
      <AuthModal />

    </header>
  );
};
