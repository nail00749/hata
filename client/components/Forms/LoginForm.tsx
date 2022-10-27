import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { useLoginMutation } from '../../services/authAPI';
import { IPayloadAuth } from '../../models/IPayloadAuth';
import { Checkbox } from '../UI/Checkbox/Checkbox';

interface LoginFormProps {
  closeModal: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ closeModal }) => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  const handlerRemember = () => {setRemember(prev => !prev)}

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IPayloadAuth = {
      email,
      password,
    };
    login(data);
  };

  return (
    <form
      onSubmit = {onSubmit}
    >
      <div
        className = 'flex flex-col items-center m-3'
      >
        <Input
          value = {email}
          onChange = {(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder = 'email'
          type='email'
        />
        <Input
          value = {password}
          onChange = {(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder = 'Пароль'
          type = 'password'
        />
        <Checkbox
          label='Запомнить?'
          checked={remember}
          onChange={handlerRemember}
        />
        <Button
          isLoading = {isLoading}
          type = {'submit'}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
