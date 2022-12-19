import { FC, ReactNode } from 'react';
import { useToggle } from '../../hooks/useToggle';

interface AccordeonProps {
  children?: ReactNode;
  title: string;
}

export const Accordeon: FC<AccordeonProps> = ({ children, title }) => {
  const [show, togglerShow] = useToggle(false);

  return (
    <div
      className = 'border-2 m-2 p-2 w-full'
    >
      <div
        className = 'flex justify-between items-center'
      >
        <h1>{title}</h1>
        <button
          onClick = {togglerShow}
          className={'text-2xl'}
        >
          {show ? '-' : '+'}
        </button>
      </div>
          <div
            className = {`accordeon-content ${show ? 'full' : ''}`}
          >
            {children}
          </div>
    </div>
  );
};
