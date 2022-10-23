import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/baseQuery';
import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { IApartment } from '../models/IApartment';


export const apartmentAPI = createApi({
  baseQuery,
  reducerPath: 'apartmentAPI',
  extractRehydrationInfo,
  endpoints: (build) => ({
    getApartments: build.query<IApartment[], void>({
      query: () => ({
        url: '/apartment',
      }),
    }),
    createApartment: build.mutation<IApartment, FormData>({
      query: (body) => ({
        url: '/apartment',
        method: 'POST',
        body,
      }),
    }),
  }),

});

export const {
  useGetApartmentsQuery,
  useCreateApartmentMutation,
} = apartmentAPI;

