import { IBooking } from '../models/IBooking';
import format from 'date-fns/format';
import { api } from './api';

// @ts-ignore
export const bookingAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation<IBooking, Partial<IBooking>>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Apartment', 'MyBooking'],
    }),
    getMyBookings: build.query<IBooking[], void>({
      query: () => ({
        url: '/bookings/my',
      }),
    }),
    getBookingsForOwnerByApartment: build.query<IBooking[], string>({
      query: (apartmentId) => ({
        url: `/bookings/my-apartment/${apartmentId}`,
      }),
      //@ts-ignore
      transformResponse: (response) => {
        let bookings = response as IBooking[];
        return bookings.map(booking => ({
          ...booking,
          startDate: format(new Date(booking.startDate) as Date, 'dd.MM.yyyy'),
          endDate: format(new Date(booking.endDate) as Date, 'dd.MM.yyyy'),
        }));
      },
    }),
    updateStatusBooking: build.mutation<IBooking, Partial<IBooking>>({
      query: ({ id, ...body }) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Apartment'],
    }),
    getLastBooking: build.query<IBooking, string>({
      query: (apartmentId) => ({
        url: `/bookings/current/${apartmentId}`,
      }),
      //@ts-ignore
      transformResponse: (response) => {
        if(response)
        {
          let booking = { ...response as object } as IBooking;
          return {
            ...booking,
            startDate: format(new Date(booking.startDate) as Date, 'dd.MM.yyyy'),
            endDate: format(new Date(booking.endDate) as Date, 'dd.MM.yyyy'),
          };
        }
        return null
      },
      providesTags: ['MyBooking'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetBookingsForOwnerByApartmentQuery,
  useUpdateStatusBookingMutation,
  useGetLastBookingQuery,
} = bookingAPI;

