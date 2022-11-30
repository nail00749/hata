import { IPayloadAuth } from '../models/IPayloadAuth';
import { fetchAuthSuccess } from '../store/slices/AuthSlice';
import { IToken } from '../models/IToken';
import { IUser } from '../models/IUser';
import { api } from './api';


export const authAPI = api.injectEndpoints({
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
          const { data } = await queryFulfilled;
          dispatch(fetchAuthSuccess(data.access_token));
        } catch (e) {
          console.log('error', e);
        }
      },
    }),
    refresh: build.query<IToken, void>({
      query: () => ({
        url: 'auth/refresh',
      }),
    }),
    logOut: build.query<any, void>({
      query: () => ({
        url: 'auth/logout',
      }),
    }),
    getProfile: build.query<IUser, void>({
      query: () => ({
        url: 'users/profile',
      }),
      providesTags: ['Me'],
    }),
    updateProfile: build.mutation<IUser, IUser>({
      query: (body) => ({
        url: 'users',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    updateAvatar: build.mutation<IUser, FormData>({
      query: (body) => ({
        url: 'users/avatar',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    sendCode: build.mutation<any, void>({
      query: () => ({
        url: 'auth/send-mail',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});


export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyLogOutQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useSendCodeMutation,
  useLazyGetProfileQuery
} = authAPI;

export const { getProfile } = authAPI.endpoints;
