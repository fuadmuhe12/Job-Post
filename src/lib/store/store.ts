import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "../features/getJobs/jobSlice";

export default function makeStore() {
  return configureStore({
    reducer: {
      jobs: JobReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
