import { Button } from '../UI/Button/Button';
import React, { useEffect } from 'react';
import { useCreateApartmentMutation } from '../../services/apartmentAPI';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks/redux';

export const SubmitRent = () => {
  const router = useRouter()
  const { apartment } = useAppSelector(state => state.rentHouseSlice);
  const [create, { isLoading, isSuccess }] = useCreateApartmentMutation();


  useEffect(() => {
    if(isSuccess) {
      router.push('/')
    }
  }, [isSuccess]);


  const sendData = () => {
    const formData = new FormData();
    const { images, ...data } = apartment;
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'object') {
        formData.append(k, JSON.stringify(v));
      } else {
        formData.append(k, String(v));
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
      className = 'm-3'
    >
      <Button
        onClick = {sendData}
        isLoading = {isLoading}
      >
        Разместить объявление
      </Button>
    </div>
  );
};
