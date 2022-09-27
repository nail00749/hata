import { useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button';

export const AuthMenu = ({ openModal }: { openModal: () => void }) => {
  const { isAuth } = useAppSelector(state => state.authSlice);

  return (
    <div
      className = 'rounded-xl2'
    >
      {
        isAuth ?
          <Button>
            Pro
          </Button> :
          <Button
            onClick = {openModal}
          >
            Войти
          </Button>
      }
    </div>
  );
};
