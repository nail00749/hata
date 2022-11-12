import { IApartment } from '../../models/IApartment';
import { FC } from 'react';
import { getNormalizeTypeHouse } from '../../utils';

interface ApartmentInfoProps {
  apartment: IApartment;
}

export const ApartmentInfo: FC<ApartmentInfoProps> = ({ apartment }) => {
  return (
    <div>
      <div
        className = 'text-center text-2xl font-bold'
      >
        Общая информация
      </div>
      <div
        className = 'ml-2 mt-2'
      >
        <div>
          {`Адрес: ${apartment.address}`}
        </div>
        <div>
          {`Тип жилья: ${getNormalizeTypeHouse(apartment.rentType)}`}
        </div>
        <div
        >
          {`Кол-во комнат: ${apartment.countRooms}`}
        </div>
        <div
        >
          {`Площадь: ${apartment.houseArea} кв.м`}
        </div>
        <div
        >
          {`Описание: ${apartment.description || 'Нет описания'}`}
        </div>
      </div>
    </div>
  );
};
