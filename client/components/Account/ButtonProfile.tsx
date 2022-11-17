import Link from 'next/link';
import { FC } from 'react';
import { IRoute } from '../../routing/routing';

interface ButtonProfileProps {
  link: IRoute
}

export const ButtonProfile: FC<ButtonProfileProps> = ({ link }) => {
  return (
    <div
      className = 'flex justify-center min-w-[150px] hover:bg-stone-100 w-full text-center py-2'
    >
      <Link
        href = {link.href}
      >
        {link.title}
      </Link>
      <hr />
    </div>
  );
};
