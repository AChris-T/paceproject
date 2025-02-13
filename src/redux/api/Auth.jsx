import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_BASE_URL from '../../constants/Api';
import Cookies from 'js-cookie';

export const Auth = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get('authToken');
      console.log(token);
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    /// Login endpoint
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),

    /// register endpoint
    registerUser: builder.mutation({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    /// forgot password
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
    proilfeCreation: builder.mutation({
      query: (body) => ({
        url: 'student/complete-profile',
        method: 'POST',
        body,
      }),
    }),
    getDashboardProfile: builder.query({
      query: () => ({
        url: '/student/get-profile',
        method: 'GET',
      }),
    }),
    getCurrentSubject: builder.query({
      query: () => {
        const subjectSelected = localStorage.getItem('subjectSelected');
        // Retrieve ID from localStorage
        if (!subjectSelected) {
          throw new Error('ID is not available in localStorage');
        }
        console.log('newId', subjectSelected);
        return {
          url: `/practice/questions?subject=${subjectSelected}`, // Append as query param
          method: 'GET',
        };
      },
    }),
    getLeaderboard: builder.query({
      query: () => ({
        url: '/leaderboard',
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useGetLeaderboardQuery,
  useRegisterUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useProilfeCreationMutation,
  useGetDashboardProfileQuery,
  useGetCurrentSubjectQuery,
} = Auth;
