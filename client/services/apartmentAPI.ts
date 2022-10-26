import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/baseQuery';
import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { IApartment } from '../models/IApartment';

export const apartmentAPI = createApi({
  baseQuery,
  reducerPath: 'apartmentAPI',
  extractRehydrationInfo,
  endpoints: (build) => {
    return ({
      getApartments: build.query<{ allCount: number, apartments: IApartment[] }, { skip: number, limit: number }>({
        query: ({ limit = 2, skip = 0 }) => ({
          url: `/apartment`,
          params: {
            skip,
            limit,
          },
        }),
      }),
      createApartment: build.mutation<IApartment, FormData>({
        query: (body) => ({
          url: '/apartment',
          method: 'POST',
          body,
        }),
      }),
    });
  },

});


export const {
  useGetApartmentsQuery,
  useCreateApartmentMutation,
  util: { getRunningOperationPromises },
} = apartmentAPI;


export const { getApartments } = apartmentAPI.endpoints;
