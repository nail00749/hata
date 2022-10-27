import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { AuthMenu } from './AuthMenu';
import { showModal } from '../../store/slices/AuthSlice';

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.authSlice);

  return (
    <div
      className = 'rounded-xl2 px-5'
    >
      {
        isAuth ?
          <AuthMenu /> :
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
