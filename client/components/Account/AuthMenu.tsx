import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../UI/Button';
import { useAppDispatch } from '../../hooks/redux';
import { logOut } from '../../store/slices/AuthSlice';

export const AuthMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLink = (link: string) => () => {
    router.push(link).then(() => setShowMenu(false));
  };

  const handlerLogOut = () => dispatch(logOut());

  return (
    <div
      className = {`
      relative
      rounded-2xl
      border-solid border-2 border-neutral-800-500
      p-1
      px-3
      flex justify-center items-center
      hover:shadow-2xlh
      hover:scale-105
      `}
    >
      <button
        onClick = {() => setShowMenu(!showMenu)}
      >
        <Image
          className = 'ml-3'
          src = {'/profile.svg'}
          width = {20}
          height = {20}
        />
      </button>
      {
        showMenu &&
        <div
          className = {`
          absolute
          z-10
          top-9 right-0.5
          bg-white
          py-3
          rounded-2xl
          drop-shadow-xl
          border-[1px] border-solid border-neutral-900-700
          `}
        >
          <div
            className = 'flex justify-center min-w-[150px] '
          >
            <Link
              href = {'/rent-house'}
            >
              <a
                className = 'hover:bg-stone-100 w-full text-center py-2'
                onClick = {handleLink('/rent-house')}
              >
                Сдать жилье
              </a>
            </Link>
          </div>
          <hr />
          <div
            className = 'flex justify-center my-2'
          >
            <Button
              onClick = {handlerLogOut}
              variant = 'error'
            >
              Выйти
            </Button>
          </div>
        </div>
      }
    </div>
  );
};
