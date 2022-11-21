import { Button } from '../UI/Button/Button';
import { useRemoveApartmentMutation } from '../../services/apartmentAPI';
import { FC, useEffect } from 'react';
import { IApartment } from '../../models/IApartment';
import { useRouter } from 'next/router';

interface OwnerButtonsProps {
  apartment: IApartment;
}

export const OwnerButtons: FC<OwnerButtonsProps> = ({ apartment }) => {
  const router = useRouter();
  const [remove, { isLoading, isSuccess }] = useRemoveApartmentMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess]);

  const handlerRemove = () => remove(apartment.id!);

  const handlerUpdate = () => router.push(`/update-rent/${apartment.id!}`);

  return (
    <div
      className = 'flex items-center'
    >
      {/*todo add statistics*/}
      <div>Статистика</div>
      <div>
        <Button
          onClick = {handlerUpdate}
          disabled = {isLoading}
        >
          Редактировать
        </Button>
        <Button
          onClick = {handlerRemove}
          isLoading = {isLoading}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};
