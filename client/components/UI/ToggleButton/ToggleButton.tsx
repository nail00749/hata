import { ButtonHTMLAttributes, FC, ReactNode, MouseEvent } from 'react';

export interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  value?: any;
  active?: boolean;
  setValue?: (value: any, e: MouseEvent<HTMLButtonElement>) => void;
}

export const ToggleButton: FC<ToggleButtonProps> = ({ children, active, value, setValue, ...otherProps }) => {
  const handlerClick = (val: any) => (e: MouseEvent<HTMLButtonElement>) => {
    if (setValue) {
      setValue(val, e);
    }
  };

  return (
    <button
      className = {`
        px-3 py-2
        border-solid border-2 border-sky-500
        first:rounded-l-2xl last:rounded-r-2xl
        first:border-r-0 last:border-l-0
        ${active ? 'bg-sky-200' : ''}
      `}
      {...otherProps}
      onClick = {handlerClick(value)}
    >
      {children}
    </button>
  );
};




