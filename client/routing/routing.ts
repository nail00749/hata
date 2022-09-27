export interface IRoute {
  href: string;
  title: string
}

export const navigationLinks: IRoute[]  = [
  {
    href: '/',
    title: 'main'
  },
  {
    href: '/about',
    title: 'about'
  }
]
