/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";

import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { apiClient } from "@/lib/apiClient";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: any;
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const playerApi = createApi({
  reducerPath: "playerApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: (cursor = 0) => ({
        url: "/v1/players",
        method: "GET",
        params: { season: 2024, per_page: 10, cursor },
      }),
    }),
  }),
});

export const { useGetPlayersQuery } = playerApi;
