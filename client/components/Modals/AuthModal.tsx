import { Modal } from './Modal';
import { FC } from 'react';
import { Button } from '../UI/Button';
import { LoginForm } from '../Forms/LoginForm';
import { RegisterForm } from '../Forms/RegisterForm';
import { useToggle } from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { hideModal } from '../../store/slices/AuthSlice';

export const AuthModal: FC = () => {
  const { openModal } = useAppSelector(state => state.authSlice);
  const [isLogin, changeToggle] = useToggle(true);
  const dispatch = useAppDispatch()
  const handlerVisible = () => dispatch(hideModal())

  return (
    <Modal
      title = {isLogin ? 'Войти' : 'Зарегистрироваться'}
      open = {openModal}
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
