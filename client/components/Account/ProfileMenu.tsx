import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../UI/Button/Button';
import { useAppDispatch } from '../../hooks/redux';
import { logOut } from '../../store/slices/AuthSlice';
import { useLazyLogOutQuery } from '../../services/authAPI';
import { ButtonProfile } from './ButtonProfile';
import { profileLinks } from '../../routing/routing';

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [trigger, { isSuccess, isLoading }] = useLazyLogOutQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut());
    }
  }, [isSuccess]);

  const handlerLogOut = () => trigger();

  return (
    <button
      onClick = {() => setShowMenu(!showMenu)}
      className = {`
      relative
      rounded-2xl
      border-solid border-2 border-neutral-800-500
      p-2
      px-3
      flex justify-center items-center
      `}
    >
      <div
        className='relative w-4 h-4'
      >
        <Image
          className = 'ml-3'
          src = {'/profile.svg'}
          layout='fill'
          objectFit='contain'
          /*width = {20}
          height = {20}*/
        />
      </div>
      {
        showMenu &&
        <div
          className = {`
          absolute
          z-20
          top-9 right-0.5
          bg-white
          py-3
          rounded-2xl
          drop-shadow-xl
          border-[1px] border-solid border-neutral-900-700
          `}
        >
          {
            profileLinks.map(link =>
              <ButtonProfile
                link = {link}
              />,
            )
          }

          <div
            className = 'flex justify-center my-2'
          >
            <Button
              onClick = {handlerLogOut}
              variant = 'error'
              isLoading = {isLoading}
            >
              Выйти
            </Button>
          </div>
        </div>
      }
    </button>
  );
};
