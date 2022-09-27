import { Modal } from './Modal';
import { FC } from 'react';
import { IModal } from './IModal';
import { Button } from '../UI/Button';
import { LoginForm } from '../Forms/LoginForm';
import { RegisterForm } from '../Forms/RegisterForm';
import { useToggle } from '../../hooks/useToggle';

export const AuthModal: FC<IModal> = ({ open, handlerVisible }) => {
  const [isLogin, changeToggle] = useToggle(true);

  return (
    <Modal
      title = {isLogin ? 'Войти' : 'Зарегистрироваться'}
      open = {open}
      handlerVisible = {handlerVisible}
    >
      {
        isLogin ?
          <LoginForm
            closeModal = {handlerVisible}
          /> :
          <RegisterForm
            toggleForm = {changeToggle}
          />
      }
      {
        <div
          className = 'flex justify-center mb-3'
        >
          <Button
            onClick = {changeToggle}
          >
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт'}
          </Button>
        </div>
      }
    </Modal>
  );
};
