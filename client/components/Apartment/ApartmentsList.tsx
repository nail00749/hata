import { useGetApartmentsQuery } from '../../services/apartmentAPI';
import { ApartmentCard } from './ApartmentCard';
import { FC } from 'react';
import { IApartment } from '../../models/IApartment';

interface ApartmentsListProps {
  apartments: IApartment[]
}

export const ApartmentsList: FC<ApartmentsListProps> = ({  apartments }) => {

  return (

    <div
      className='flex flex-wrap'
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


