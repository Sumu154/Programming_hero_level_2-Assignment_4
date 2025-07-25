import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data']; // <-- change this from `data` to `body`
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body, // <-- pass `body` as `data`
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
