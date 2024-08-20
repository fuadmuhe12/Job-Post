import {
  dataComing,
  initStateInterface,
  Job,
  singleDataComing,
} from "@/lib/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const fetchJobs = createAsyncThunk("jobs/fetchJobs", () => {
  return axios(" https://akil-backend.onrender.com/opportunities/search")
    .then((val) => {
      return val.data;
    })
    .then((val: dataComing) => val.data);
});

const fetchJobById = createAsyncThunk("jobs/fetchJobById", (id: string) => {
  return axios(" https://akil-backend.onrender.com/opportunities/" + id)
    .then((val) => {
      return val.data;
    })
    .then((val: singleDataComing) => val.data);
});

const initialState: initStateInterface = {
  jobs: [],
  loading: false,
  error: "",
  curJob: null,
};
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    });
    build.addCase(
      fetchJobs.fulfilled,
      (state, action: PayloadAction<Job[] | null>) => {
        state.jobs = action.payload!;
        state.loading = false;
        state.error = "";
      }
    );
    build.addCase(fetchJobs.rejected, (state, action) => {
      state.error = action.error.message ?? "something went wrong";
      state.loading = false;
      state.jobs = [];
    });
    build.addCase(fetchJobById.pending, (state) => {
      state.loading = true;
      state.curJob = null;
    });
    build.addCase(
      fetchJobById.fulfilled,
      (state, action: PayloadAction<Job | null>) => {
        state.curJob = action.payload!;
        state.loading = false;
        state.error = "";
      }
    );
    build.addCase(fetchJobById.rejected, (state, action) => {
      state.error = action.error.message ?? "something went wrong";
      state.loading = false;
      state.jobs = [];
      state.curJob = null;
    });
  },
});

export { fetchJobs, fetchJobById };
const JobReducer = jobSlice.reducer;
export default JobReducer;
