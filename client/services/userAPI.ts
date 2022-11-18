import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../store/baseQuery';
import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { IUser } from '../models/IUser';


export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReAuth,
  extractRehydrationInfo,
  endpoints: (build) => ({
    getUser: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),

  }),
});

export const { useGetUserQuery } = userAPI;
