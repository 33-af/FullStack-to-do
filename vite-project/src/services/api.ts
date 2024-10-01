import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from "../store/store";






export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8008/api",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.user?.token || localStorage.getItem("token");
        console.log('Token:', token); // Логируем токен
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})