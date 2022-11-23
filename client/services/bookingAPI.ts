import { extractRehydrationInfo } from '../store/extraRehydrationInfo';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../store/baseQuery';
import { IBooking } from '../models/IBooking';

export const bookingAPI = createApi({
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
    getMyBookings: build.query<IBooking[], void>({
      query: () => ({
        url: '/bookings/my',
      }),
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingAPI;

