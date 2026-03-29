import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import type { Job, JobFilters, PaginatedResponse } from '../../types';

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

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery,
  tagTypes: ['Job', 'MyJobs'],
  endpoints: (builder) => ({
    getJobs: builder.query<PaginatedResponse<Job>, JobFilters>({
      query: (filters) => ({
        url: '/jobs',
        params: filters,
      }),
      providesTags: ['Job'],
    }),
    getJob: builder.query<{ data: Job }, number>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (job) => ({
        url: '/jobs',
        method: 'POST',
        body: job,
      }),
      invalidatesTags: ['Job', 'MyJobs'],
    }),
    updateJob: builder.mutation<Job, { id: number; data: Partial<Job> }>({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Job', id }, 'MyJobs'],
    }),
    deleteJob: builder.mutation<void, number>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job', 'MyJobs'],
    }),
    getMyJobs: builder.query<PaginatedResponse<Job>, void>({
      query: () => '/my-jobs',
      providesTags: ['MyJobs'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetMyJobsQuery,
} = jobApi;