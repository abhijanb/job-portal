import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import type { Application, PaginatedResponse, UpdateApplicationStatus } from '../../types';

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

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery,
  tagTypes: ['Application', 'JobApplications'],
  endpoints: (builder) => ({
    applyToJob: builder.mutation<Application, { jobId: number; data: FormData }>({
      query: ({ jobId, data }) => ({
        url: `/jobs/${jobId}/apply`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Application'],
    }),
    withdrawApplication: builder.mutation<void, number>({
      query: (applicationId) => ({
        url: `/applications/${applicationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Application'],
    }),
    getMyApplications: builder.query<PaginatedResponse<Application>, void>({
      query: () => '/my-applications',
      providesTags: ['Application'],
    }),
    getJobApplications: builder.query<PaginatedResponse<Application>, number>({
      query: (jobId) => `/employer/jobs/${jobId}/applications`,
      providesTags: (_result, _error, jobId) => [{ type: 'JobApplications', id: jobId }],
    }),
    updateApplicationStatus: builder.mutation<Application, UpdateApplicationStatus>({
      query: ({ applicationId, status }) => ({
        url: `/applications/${applicationId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { applicationId }) => [
        { type: 'Application', id: applicationId },
        'JobApplications',
      ],
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useWithdrawApplicationMutation,
  useGetMyApplicationsQuery,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = applicationApi;