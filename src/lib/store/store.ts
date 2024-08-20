import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "../features/getJobs/jobSlice";
import { apiSlice } from "../features/api/apiSlice";

export default function makeStore() {
  return configureStore({
    reducer: {
      jobs: JobReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
