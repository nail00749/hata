import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { useLoginMutation } from '../../services/authAPI';
import { IPayloadAuth } from '../../models/IPayloadAuth';
import { useRouter } from 'next/router';

interface LoginFormProps {
  closeModal: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ closeModal }) => {
  const router = useRouter();
  const [login, { isLoading, isSuccess, error, isError }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

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
        />
        <Input
          value = {password}
          onChange = {(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder = 'Пароль'
          type = 'password'
        />
        <Button
          //isLoading = {isLoading}
          type = {'submit'}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
