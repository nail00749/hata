import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { ProfileMenu } from './ProfileMenu';
import { showModal } from '../../store/slices/AuthSlice';

export const LoginMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.authSlice);

  return (
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
      {

      }
    </div>
  );
};
