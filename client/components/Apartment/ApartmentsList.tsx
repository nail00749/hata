import { ApartmentCard } from './ApartmentCard';
import { FC } from 'react';
import { IApartment } from '../../models/IApartment';

interface ApartmentsListProps {
  apartments: IApartment[]
}

export const ApartmentsList: FC<ApartmentsListProps> = ({  apartments }) => {

  return (
    <div
      className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
    >
      {
        apartments.map(apartment =>
          <ApartmentCard
            apartment = {apartment}
            key = {apartment.id}
          />,
        )
      }
    </div>
  );
};


