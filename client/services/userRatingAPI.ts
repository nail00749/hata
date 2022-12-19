import { api } from './api';
import { IUserRating } from '../models/IUserRating';


export const userRatingAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createUserRating: build.mutation<IUserRating, Partial<IUserRating>>({
      query: (body) => ({
        url: '/user-rating',
        method: 'POST',
        body,
      }),
    }),
    getRatingByUser: build.query<{ rates: IUserRating[], avg: string }, string>({
      query: (id) => ({
        url: `/user-rating/user/${id}`,
      }),
    }),
  }),
});

export const { useCreateUserRatingMutation, useGetRatingByUserQuery, useLazyGetRatingByUserQuery } = userRatingAPI;
