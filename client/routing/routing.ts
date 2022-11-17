export interface IRoute {
  href: string;
  title: string;
}

export const navigationLinks: IRoute[] = [
  {
    href: '/',
    title: 'Главная',
  },
  {
    href: 'my-booking',
    title: 'Мои бронирования',
  },
  {
    href: 'my-rent',
    title: 'Мои объявления',
  },
  {
    href: '/about',
    title: 'О сайте',
  },
];

export const profileLinks: IRoute[] = [
  {
    href: 'profile',
    title: 'Профиль',
  },
  {
    href: '/rent-house',
    title: 'Сдать жилье',
  },
];
