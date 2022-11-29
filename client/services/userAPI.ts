import { IUser } from '../models/IUser';
import { api } from './api';

export const userAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
  }),
  overrideExisting: true
});

export const { useGetUserQuery } = userAPI;
