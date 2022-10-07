import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Input } from '../UI/Input';
import { TextArea } from '../UI/TextArea';
import { FileInput } from '../UI/FileInput';
import React, { ChangeEvent } from 'react';
import { Button } from '../UI/Button';
import { setFiles } from '../../store/slices/RentHouseSlice';
import { useCreateApartmentMutation } from '../../services/apartmentAPI';
import { IApartmentCreate } from '../../models/IApartment';

export const InfoRent = () => {
  const dispatch = useAppDispatch();
  const rentData = useAppSelector(state => state.rentHouseSlice);
  const [create, {}] = useCreateApartmentMutation();

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(setFiles(e.target.files));
    }
  };

  const sendData = () => {
    const formData = new FormData();
    const { images, ...data } = rentData;
    for (const [k, v] of Object.entries(data)) {
      formData.append(k, v.toString());
    }
    if (images) {
      for (const image of images) {
        formData.append('images', image);
      }
    }
    create(formData);
  };

  return (
    <div
      className = 'p-2 flex flex-col'
    >
      <Input
        placeholder = {'Стоимость'}
        type = 'number'
        required
      />
      <Input
        placeholder = {'Количество комнат'}
        type = 'number'
        required
      />
      <Input
        placeholder = {'Общая площадь'}
        type = 'number'
      />
      <FileInput
        onChange = {handlerFile}
        multiple
        accept = {'image/*'}
      />
      <TextArea
        placeholder = {'Доп информация'}
        rows = {3}
      />
      <div
        className = 'ml-3'
      >
        <Button
          onClick = {sendData}
        >
          Разместить объеявление
        </Button>
      </div>

    </div>
  );
};
