import { FC } from 'react';
import { IUser } from '../../models/IUser';


interface GetContactsOwnerProps {
  owner: IUser;
}

export const GetContactsOwner: FC<GetContactsOwnerProps> = ({ owner }) => {


  return (
    <div>
      <div>{`email: ${owner.email}`}</div>
      <div>{`Имя ${owner.firstName}`}</div>
      <div>{`Фамилия ${owner.lastName}`}</div>
    </div>
  );
};
