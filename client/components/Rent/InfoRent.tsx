import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Input } from '../UI/Input/Input';
import { TextArea } from '../UI/TextArea';
import { FileInput } from '../UI/FileInput';
import React, { ChangeEvent } from 'react';
import { rentHouseState, setData, setFiles } from '../../store/slices/RentHouseSlice';

export const InfoRent = () => {
  const dispatch = useAppDispatch();
  const { apartment } = useAppSelector(state => state.rentHouseSlice);

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(setFiles(e.target.files));
    }
  };

  const handlerData = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setData({ key: e.target.name as keyof rentHouseState, value: e.target.value }));
  };

  const handlerDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setData({ key: e.target.name as keyof rentHouseState, value: e.target.value }));
  };


  return (
    <div
      className = 'p-2 flex flex-col'
    >
      <Input
        onChange = {handlerData}
        value = {apartment.title}
        name = 'title'
        placeholder = {'Заголовок'}
        required
      />
      <Input
        onChange = {handlerData}
        value = {apartment.price}
        name = 'price'
        placeholder = {'Стоимость'}
        type = 'number'
        required
      />
      <Input
        onChange = {handlerData}
        value = {apartment.countRooms}
        name = 'countRooms'
        placeholder = {'Количество комнат'}
        type = 'number'
        required
      />
      <Input
        onChange = {handlerData}
        value = {apartment.houseArea}
        name = 'houseArea'
        placeholder = {'Общая площадь'}
        type = 'number'
      />
      <FileInput
        onChange = {handlerFile}
        multiple
        accept = {'image/*'}
      />
      <TextArea
        onChange = {handlerDescription}
        value = {apartment.description}
        name = 'description'
        placeholder = {'Доп информация'}
        rows = {3}
      />


    </div>
  );
};
