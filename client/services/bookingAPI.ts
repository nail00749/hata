import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../store/baseQuery';
import { IBooking } from '../models/IBooking';

const bookingAPI = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'bookingAPI',
  extractRehydrationInfo,
  endpoints: (build) => ({
    createBooking: build.mutation<IBooking, IBooking>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = bookingAPI;

