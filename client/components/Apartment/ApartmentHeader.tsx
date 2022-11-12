import { FC } from 'react';

interface ApartmentHeaderProps {
  title: string
  price: number
}

export const ApartmentHeader:FC<ApartmentHeaderProps> = ({title, price}) => {
  return (
    <div>
      <div
        className='text-center font-bold text-5xl mb-3'
      >
        {title}
      </div>
      <div
        className='text-center font-bold text-2xl'
      >
        {`Стоимость: ${price}$`}
      </div>
    </div>
  );
};
