import { BookMarkComing } from "@/lib/types/types";
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
    }),
    removeBookMark: builder.mutation<BookMarkComing, addBookMarkRequest>({
      query: ({ id, TOKEN }) => ({
        url: `bookmarks/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
    }),
    getBookMarks: builder.query<BookMarkComing, string>({
      query: (TOKEN) => ({
        url: `bookmarks`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
    }),
  }),
});

export const {
  useAddBookMarkMutation,
  useRemoveBookMarkMutation,
  useGetBookMarksQuery,
} = apiSlice;
