import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';
import { Spinner } from '../Navigation/Spinner';
import { VariantType } from '../../models/UI/variantsColor';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  isLoading?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
                                          isLoading,
                                          variant = 'success',
                                          children,
                                          ...otherProps
                                        }) => {
  const color = useMemo(() => {
    switch (variant) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'outlined':
        return 'border-2 border-solid border-sky-500 text-sky-500';
      case 'active':
        return 'bg-sky-500 text-black'
    }
  }, [variant]);

  return (
    <button
      className = {`
      max-w-max 
      flex justify-center items-center 
      px-3 py-2 
      drop-shadow-xl rounded-xl 
      text-indigo-50 hover:scale-105 ${color} 
      disabled:bg-neutral-700`
      }
      disabled = {isLoading}
      {...otherProps}
    >
      {
        isLoading &&
        <Spinner />
      }
      {children}
    </button>
  );
};
