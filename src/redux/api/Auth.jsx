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

        // This is used if you need to set a different header for a particular request e.g file upload
        // headers:{
        //   "Content-Type": "multipart/form-data",
        // }
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
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useProilfeCreationMutation,
} = Auth;
