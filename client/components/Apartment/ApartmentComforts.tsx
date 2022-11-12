import { FC } from 'react';

interface ApartmentComfortsProps {
  comforts: string[];
}

export const ApartmentComforts: FC<ApartmentComfortsProps> = ({ comforts }) => {
  return (
    <div
      className = 'ml-2'
    >
      <div
        className = 'text-center text-2xl font-bold'
      >
        Удобства
      </div>
      <ul
        className = 'list-disc mt-2'
      >
        {
          comforts ?
            comforts?.map((comfort, i) =>
              <li
                key = {i}
              >
                {comfort}
              </li>,
            ) :
            <div>Нет информации о удобствах</div>
        }
      </ul>
    </div>
  );
};
