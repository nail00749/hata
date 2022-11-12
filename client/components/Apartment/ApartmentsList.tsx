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
      className='grid sm:grid-cols-2 md:grid-cols-3'
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


