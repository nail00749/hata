import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../store/baseQuery';

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'authAPI',
  tagTypes: ['Me', 'Apartment'],
  endpoints: () => ({})
})
