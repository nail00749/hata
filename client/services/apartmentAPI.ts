import { IApartment } from '../models/IApartment';
import { IQueryApartment } from '../models/IQuery/IQueryApartment';
import { api } from './api';

export const apartmentAPI = api.injectEndpoints({
  endpoints: (build) => {
    return ({
      getApartments: build.query<IApartment[], IQueryApartment>({
        query: (params) => ({
          url: `/apartment`,
          params: {
            ...params,
          },
        }),
        serializeQueryArgs: ({ queryArgs, endpointName, endpointDefinition }) => {
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
  overrideExisting: true
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
