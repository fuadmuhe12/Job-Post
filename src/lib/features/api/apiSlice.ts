import {
  BookMarkComing,
  dataComing,
  singleDataComing,
} from "@/lib/types/types";
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface addBookMarkRequest {
  id: string;
  TOKEN: string;
}

export const apiSlice = createApi({
  reducerPath: "apiBase",
  tagTypes: ["BookMark"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com/",
  }),
  endpoints: (builder) => ({
    /* respose, sent  => the types */
    addBookMark: builder.mutation<BookMarkComing, addBookMarkRequest>({
      query: ({ id, TOKEN }) => ({
        url: `bookmarks/${id}`,

        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
      invalidatesTags: ["BookMark"],
    }),
    removeBookMark: builder.mutation<BookMarkComing, addBookMarkRequest>({
      query: ({ id, TOKEN }) => ({
        url: `bookmarks/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
      invalidatesTags: ["BookMark"],
    }),
    getBookMarks: builder.query<BookMarkComing, string>({
      query: (TOKEN) => ({
        url: `bookmarks`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
      providesTags: ["BookMark"],
    }),
    getAllJobs: builder.query<dataComing, void>({
      query: () => ({
        url: "opportunities/search",
      }),
    }),
    getJobById: builder.query<singleDataComing, string>({
      query: (id) => ({
        url: `opportunities/${id}`,
      }),
    }),
  }),
});

export const {
  useAddBookMarkMutation,
  useRemoveBookMarkMutation,
  useGetBookMarksQuery,
  useGetAllJobsQuery, 
  useGetJobByIdQuery
} = apiSlice;
