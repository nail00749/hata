import { useRegisterMutation } from '../../services/authAPI';
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { IPayloadAuth } from '../../models/IPayloadAuth';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface RegisterFormProps {
  toggleForm: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ toggleForm }) => {
  const [register, { isLoading, isSuccess, error, isError }] = useRegisterMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isSuccess) {
      toggleForm();
    }
  }, [isSuccess]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IPayloadAuth = {
      email,
      password,
    };
    register(data);
  };

  return (

    <form
      action = ''
      onSubmit = {onSubmit}
    >
      <div
        className = 'flex flex-col items-center justify-between m-3'
      >
        <Input
          value = {email}
          placeholder = {'Email'}
          onChange = {(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          value = {password}
          onChange = {(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          placeholder = 'Пароль'
          type = 'password'

        />
        <Button
          isLoading = {isLoading}
        >
          Регистрация
        </Button>
      </div>
    </form>
  );
};
