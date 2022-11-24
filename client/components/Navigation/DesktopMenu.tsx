import { navigationLinks } from '../../routing/routing';
import Link from 'next/link';

export const DesktopMenu = () => {
  return (
    <ul
      className = 'hidden md:flex w-full'
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
  );
};
