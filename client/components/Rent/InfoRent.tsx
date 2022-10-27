import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Input } from '../UI/Input/Input';
import { TextArea } from '../UI/TextArea';
import { FileInput } from '../UI/FileInput';
import React, { ChangeEvent } from 'react';
import { Button } from '../UI/Button/Button';
import { rentHouseState, setData, setFiles } from '../../store/slices/RentHouseSlice';
import { useCreateApartmentMutation } from '../../services/apartmentAPI';

export const InfoRent = () => {
  const dispatch = useAppDispatch();
  const rentData = useAppSelector(state => state.rentHouseSlice);
  const [create, {}] = useCreateApartmentMutation();

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(setFiles(e.target.files));
    }
  };

  const handlerData = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setData({key: e.target.name as keyof rentHouseState, value: e.target.value}))
  };

  const handlerDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setData({key: e.target.name as keyof rentHouseState, value: e.target.value}))
  }

  const sendData = () => {
    const formData = new FormData();
    const { images, ...data } = rentData;
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'object') {
        formData.append(k, JSON.stringify(v));
      } else {
        formData.append(k, v.toString());
      }
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
        onChange={handlerData}
        value={rentData.price}
        name='price'
        placeholder = {'Стоимость'}
        type = 'number'
        required
      />
      <Input
        onChange={handlerData}
        value={rentData.countRooms}
        name='countRooms'
        placeholder = {'Количество комнат'}
        type = 'number'
        required
      />
      <Input
        onChange={handlerData}
        value={rentData.houseArea}
        name='houseArea'
        placeholder = {'Общая площадь'}
        type = 'number'
      />
      <FileInput
        onChange = {handlerFile}
        multiple
        accept = {'image/*'}
      />
      <TextArea
        onChange={handlerDescription}
        value={rentData.description}
        name='description'
        placeholder = {'Доп информация'}
        rows = {3}
      />
      <div
        className = 'ml-3'
      >
        <Button
          onClick = {sendData}
        >
          Разместить объявление
        </Button>
      </div>

    </div>
  );
};
