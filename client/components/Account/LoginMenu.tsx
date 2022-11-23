import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { ProfileMenu } from './ProfileMenu';
import { showModal } from '../../store/slices/AuthSlice';
import { useEffect, useState } from 'react';

export const LoginMenu = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.authSlice.isAuth);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ?
    <div
      className = 'rounded-xl2 px-5'
    >
      {
        isAuth ?
          <ProfileMenu /> :
          <Button
            onClick = {() => dispatch(showModal())}
          >
            Войти
          </Button>
      }
    </div> : null;
};
