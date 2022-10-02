import { ButtonHTMLAttributes, FC, ReactNode, MouseEvent } from 'react';
import { OrientationType } from '../../../models/UI/Orientation';

export interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  value?: any;
  active?: boolean;
  setValue?: (value: any, e: MouseEvent<HTMLButtonElement>) => void;
  orientation?: OrientationType;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
                                                      children,
                                                      active,
                                                      value,
                                                      setValue,
                                                      orientation='horizontal',
                                                      ...otherProps
                                                    }) => {
  const handlerClick = (val: any) => (e: MouseEvent<HTMLButtonElement>) => {
    if (setValue) {
      setValue(val, e);
    }
  };

  return (
    <button
      //
      className = {`
        px-3 py-2
        border-solid border-2 border-sky-500
        ${orientation === 'horizontal' ? 'first:border-l-2 last:border-l-0 border-l-0 border-r-1' : 'first:border-b-0 last:border-b-2 border-t-1 border-b-0'}
        ${orientation === 'horizontal' ? 'first:rounded-l-xl last:rounded-r-xl' : 'first:rounded-t-xl last:rounded-b-xl'}
        ${active ? 'bg-sky-200' : ''}
      `}
      {...otherProps}
      onClick = {handlerClick(value)}
    >
      {children}
    </button>
  );
};




