import { FC } from 'react';
import { IUser } from '../../models/IUser';

interface ProfileInfoProps {
  user: IUser;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div>
      <div>{`email: ${user.email}`}</div>
      <div
        className='flex space-x-5'
      >
        <div>{`Имя: ${user.firstName || 'нет имени'}`}</div>
        <div>{`Фамилия: ${user.lastName || 'нет фамилии'}`}</div>
      </div>
      <div
        className='flex space-x-5'
      >
        <div>{`Телефон: ${user.phone || 'нет телефона'}`}</div>
      </div>
    </div>
  );
};
