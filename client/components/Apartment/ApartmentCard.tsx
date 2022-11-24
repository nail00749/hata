import { FC } from 'react';
import Image from 'next/image';
import { IApartment } from '../../models/IApartment';
import homeDefault from '../../public/home.jpg';
import Link from 'next/link';
import { BaseURL } from '../../config/BaseURL';

interface ApartmentCardProps {
  apartment: IApartment;
}

export const ApartmentCard: FC<ApartmentCardProps> = ({ apartment }) => {

  return (
    <Link
      href = {`apartment/${apartment.id}`}
    >
      <a>
        <div
          className = 'flex flex-col justify-center items-center m-2 p-1 cursor-pointer'
        >
          <div
            className = 'relative w-full h-40'
          >
            <Image
              className = 'rounded-xl'
              /*width = '200'
              height = '200'
              layout = 'responsive'*/
              layout = 'fill'
              objectFit = 'contain'
              src = {apartment.images && apartment.images[0] ? BaseURL + apartment.images[0] : homeDefault}
              alt = {''}
            />
          </div>
          <div
            className = 'text-center mt-1'
          >
            <div>{apartment.title}</div>
            <div>{apartment.price} $</div>
          </div>
        </div>
      </a>
    </Link>
  );
};
