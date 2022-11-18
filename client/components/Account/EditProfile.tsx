import { Input } from '../UI/Input/Input';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IUser } from '../../models/IUser';
import { Button } from '../UI/Button/Button';
import { useUpdateProfileMutation } from '../../services/authAPI';

interface EditProfileProps {
  editUser: IUser;
  success: () => void;
}

export const EditProfile: FC<EditProfileProps> = ({ editUser, success }) => {
  const [user, setUser] = useState<IUser>(JSON.parse(JSON.stringify(editUser)));
  const [update, { isLoading, isSuccess }] = useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      success();
    }
  }, [isSuccess]);

  const handlerUser = (e: ChangeEvent<HTMLInputElement>) => setUser(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));

  const handlerSave = () => {
    update(user);
  };

  return (
    <div
      className = 'flex flex-col m-2'
    >
      <Input
        value = {user.firstName}
        onChange = {handlerUser}
        name = 'firstName'
        placeholder = {'Имя'}
      />
      <Input
        value = {user.lastName}
        onChange = {handlerUser}
        name = 'lastName'
        placeholder = {'Фамилия'}
      />
      <Input
        value = {user.phone}
        onChange = {handlerUser}
        name = 'phone'
        placeholder = {'Номер телефона'}
      />
      <Button
        onClick = {handlerSave}
        isLoading = {isLoading}
      >
        Сохранить
      </Button>
    </div>
  );
};
