import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import type { User, UpdateProfileData } from '../../types';

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

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<User, UpdateProfileData>({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;