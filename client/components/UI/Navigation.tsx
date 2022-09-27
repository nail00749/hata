import Link from 'next/link';
import { navigationLinks } from '../../routing/routing';
import { AuthModal } from '../Modals/AuthModal';
import { AuthMenu } from '../Account/AuthMenu';
import React, { useState } from 'react';

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const handlerOpen = () => setOpen(prev => !prev);

  return (
    <header
      className = 'h-20'
    >
      <nav
        className = 'flex justify-between items-center p-3 shadow-lg rounded-b-md bg-neutral-800'
      >
        <ul
          className = 'flex '
        >
          {
            navigationLinks.map((route) =>
              <li
                className = 'ml-3'
                key = {route.href}
              >
                <Link href = {route.href}>
                  {route.title}
                </Link>
              </li>,
            )
          }
        </ul>
        {
          <AuthMenu
            openModal = {() => setOpen(true)}
          />
        }
      </nav>
      <AuthModal
        open = {open}
        handlerVisible = {handlerOpen}
      />

    </header>
  );
};
