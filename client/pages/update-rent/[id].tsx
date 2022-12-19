import React, { useEffect } from 'react';
import { Layout } from '../../components/UI/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  useGetOneForUpdateQuery,
  useUpdateApartmentMutation,
} from '../../services/apartmentAPI';
import { useRouter } from 'next/router';
import { setApartment } from '../../store/slices/RentHouseSlice';
import { InfoRent } from '../../components/Rent/InfoRent';
import { IApartmentCreate } from '../../models/IApartment';
import { Button } from '../../components/UI/Button/Button';

const Page = () => {
  const { query, ...router } = useRouter();
  const { data: apartment } = useGetOneForUpdateQuery(String(query.id));
  const { apartment: updateApartment } = useAppSelector(state => state.rentHouseSlice);
  const [update, { isSuccess }] = useUpdateApartmentMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (apartment) {
      const { images, owner, ...other } = apartment;
      dispatch(setApartment(other as IApartmentCreate));
    }
  }, [apartment]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess]);

  const handlerUpdate = () => {
    const formData = new FormData();

    const { images, ...data } = updateApartment;
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
    update({
      id: apartment!.id!,
      formData,
    });
  };

  return (
    <Layout>
      <div>
        <InfoRent />
        <Button
          onClick = {handlerUpdate}
        >
          Обновить
        </Button>
      </div>
    </Layout>
  );
};


export default Page;
