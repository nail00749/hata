import { FC, ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
}

export const Typography: FC<TypographyProps> = ({ children }) => {
  return (
    <p>
      {children}
    </p>
  );
};
