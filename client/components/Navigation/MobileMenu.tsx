import { navigationLinks } from '../../routing/routing';
import { useState } from 'react';
import Link from 'next/link';

export const MobileMenu = () => {
  const [show, setShow] = useState(false);

  const handlerNavBar = () => setShow(prev => !prev);

  return (
    <div
      className = 'flex md:hidden justify-between w-full'
    >
      <button
        onClick = {handlerNavBar}
      >
        <svg className = 'w-6 h-6' aria-hidden = 'true' fill = 'currentColor' viewBox = '0 0 20 20'
             xmlns = 'http://www.w3.org/2000/svg'>
          <path fill-rule = 'evenodd'
                d = 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clip-rule = 'evenodd'></path>
        </svg>
      </button>
      {
        show &&
        <ul
          className = 'absolute z-10 top-12 left-0 right-0 w-full bg-sky-100 p-4 rounded-2xl border-2 border-stone-500 drop-shadow-xl'
        >
          {
            navigationLinks.map(link =>
              <li
                className = 'ml-3'
                key = {link.href}
              >
                <Link href = {link.href}>
                  {link.title}
                </Link>
              </li>,
            )
          }
        </ul>
      }
    </div>
  );
};
