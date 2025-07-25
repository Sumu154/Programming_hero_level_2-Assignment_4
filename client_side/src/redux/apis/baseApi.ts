import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://server-side-psi-one.vercel.app/api',
  }),
  tagTypes: ['Borrow', 'Book'],
  endpoints: () => ({}), // empty here
});
