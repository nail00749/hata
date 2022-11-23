import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../store/baseQuery';
import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { IApartment } from '../models/IApartment';

export const apartmentAPI = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'apartmentAPI',
  extractRehydrationInfo,
  tagTypes: ['Apartment'],
  endpoints: (build) => {
    return ({
      getApartments: build.query<IApartment[], number>({
        query: (skip) => ({
          url: `/apartment`,
          params: {
            skip,
          },
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, newItems) => {
          currentCache.push(...newItems);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
      getOneApartment: build.query<IApartment, string>({
        query: (id) => ({
          url: `/apartment/${id}`,
        }),
        transformResponse: (response, meta, arg) => {
          let apartment = response as IApartment;
          if (apartment.comforts) {
            apartment.comforts = JSON.parse(String(apartment.comforts));
          }
          return apartment;
        },
        providesTags: ['Apartment'],
      }),
      getOneForUpdate: build.query<IApartment, string>({
        query: (id) => ({
          url: `/apartment/update/${id}`,
        }),
      }),
      createApartment: build.mutation<IApartment, FormData>({
        query: (body) => ({
          url: '/apartment',
          method: 'POST',
          body,
        }),
      }),
      updateApartment: build.mutation<IApartment, { formData: FormData, id: string }>({
        query: ({ id, formData }) => ({
          url: `/apartment/${id}`,
          method: 'PATCH',
          body: formData,
        }),
      }),
      removeApartment: build.mutation<IApartment, string>({
        query: (id) => ({
          url: `/apartment/${id}`,
          method: 'DELETE',
        }),
      }),
      getMyApartments: build.query<IApartment[], void>({
        query: () => ({
          url: '/apartment/my',
        }),
      }),
    });
  },

});


export const {
  useGetApartmentsQuery,
  useCreateApartmentMutation,
  useGetOneApartmentQuery,
  useUpdateApartmentMutation,
  useRemoveApartmentMutation,
  useGetOneForUpdateQuery,
  useGetMyApartmentsQuery,
} = apartmentAPI;


export const { getApartments, getOneApartment, getOneForUpdate } = apartmentAPI.endpoints;
