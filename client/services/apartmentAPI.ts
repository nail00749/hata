import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReAuth } from '../store/baseQuery';
import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { IApartment } from '../models/IApartment';

export const apartmentAPI = createApi({
  baseQuery: baseQueryWithReAuth,
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
      getOneApartment: build.query<IApartment, string>({
        query: (id) => ({
          url: `/apartment/${id}`,
        }),
        transformResponse: (response, meta, arg) => {
          let apartment = response as IApartment;
          if (apartment.comforts) {
            const comforts = JSON.parse(String(apartment.comforts));
            apartment.comforts = comforts;
          }
          return apartment;
        },
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
  useGetOneApartmentQuery,
  util: { getRunningOperationPromises },
} = apartmentAPI;


export const { getApartments, getOneApartment } = apartmentAPI.endpoints;
