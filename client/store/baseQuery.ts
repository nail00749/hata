import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../config/BaseURL';
import { fetchAuthSuccess, logOut } from './slices/AuthSlice';
import { IToken } from '../models/IToken';

export const baseQuery = fetchBaseQuery({
  baseUrl: BaseURL,
  prepareHeaders: headers => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  > = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if(result.error && result.error.status === 401) {
    const { data } = await baseQuery('auth/refresh', api, extraOptions) as {data: IToken}
    if(data) {
      api.dispatch(fetchAuthSuccess(String(data.access_token) ))
      result = await baseQuery(args, api, extraOptions)
    }
    else {
      api.dispatch(logOut())
    }
  }

  return result

}
