import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/baseQuery';
import { HYDRATE } from 'next-redux-wrapper';
import { IPayloadAuth } from '../models/IPayloadAuth';
import { fetchAuthSuccess } from '../store/slices/AuthSlice';


export const authAPI = createApi({
  baseQuery,
  reducerPath: 'authAPI',
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    register: build.mutation<undefined, IPayloadAuth>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<any, IPayloadAuth>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled
          dispatch(fetchAuthSuccess(data.access_token))
        }
        catch (e){
          console.log('error',e);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authAPI;
