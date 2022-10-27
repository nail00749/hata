import { FC, useMemo } from 'react';
import { Button } from '../UI/Button';
import { useRouter } from 'next/router';

interface PaginationProps {
  allCount: number;
  link?: string;
}

export const Pagination: FC<PaginationProps> = ({ allCount, link = '' }) => {
  const router = useRouter();
  const currentPage = Number(router.query.page || 1);
  const arr = useMemo(() => {
    const allPages = Math.ceil(allCount / 20);
    return Array.from({ length: allPages }, (_, i) => i + 1).filter(i => {
      if (i === 1 || allPages === i || i === currentPage) {
        return i;
      }
      if (currentPage - i === 1 || currentPage - i === 2) {
        return i;
      }
      if (i - currentPage === 1 || i - currentPage === 2) {
        return i;
      }
    });
  }, [currentPage]);

  const handlerPage = (page: number) => router.push(`${link}/${page}`);

  return (
    <div
      className = 'flex'
    >
      {
        arr.map(i =>
          <Button
            variant = {currentPage === i ? 'active' : 'outlined'}
            onClick = {() => handlerPage(i)}
          >
            {i}
          </Button>,
        )
      }
    </div>
  );
};
