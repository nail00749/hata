import { FC } from 'react';
import Image from 'next/image';
import { IApartment } from '../../models/IApartment';
import homeDefault from '../../public/home.jpg';
import Link from 'next/link';

interface ApartmentCardProps {
  apartment: IApartment;
}

export const ApartmentCard: FC<ApartmentCardProps> = ({ apartment }) => {
 return null
  /*return (
    <Link
      href = {`apartment/${apartment.title}`}
    >
      <div
        className = 'flex flex-col justify-center items-center m-5 cursor-pointer'
      >
          <div>
            <Image
              className = 'rounded-xl'
              src = {apartment.srcImg || homeDefault}
              alt = {''}
              width = {200}
              height = {200}
            />
          </div>
          <div>
            <div>{apartment.title}</div>
            <div>{apartment.price} $</div>
          </div>
      </div>
    </Link>
  );*/
};
