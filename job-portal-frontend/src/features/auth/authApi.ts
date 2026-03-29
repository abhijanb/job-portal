import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import type { LoginCredentials, RegisterData, AuthResponse } from '../../types';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    resendVerification: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/email/verification-notification',
        method: 'POST',
      }),
    }),
    verifyEmail: builder.mutation<{ message: string }, { id: string; hash: string }>({
      query: ({ id, hash }) => ({
        url: `/email/verify/${id}/${hash}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useResendVerificationMutation,
  useVerifyEmailMutation,
} = authApi;