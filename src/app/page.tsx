"use client";
import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/lib/features/getJobs/jobSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Link from "next/link";
import { useEffect } from "react";
import {
  useAddBookMarkMutation,
  useRemoveBookMarkMutation,
  useGetBookMarksQuery,
  useGetAllJobsQuery,
} from "@/lib/features/api/apiSlice";
import { useSession } from "next-auth/react";
import Spinner from "@/components/spinner";

export default function Home() {
  const [
    addBookMark,
    {
      isLoading: IsAddLoading,
      error,
      isSuccess,
      originalArgs: addMarkOrigArgs,
    },
  ] = useAddBookMarkMutation();
  const [
    removeBookMark,
    { isLoading: isRemoveLoading, originalArgs: remMarkOrigArgs },
  ] = useRemoveBookMarkMutation();
  const { data: SessionData, status } = useSession();
  const { data: bookMarkData, isLoading: isBookMarkLoading } =
    useGetBookMarksQuery(SessionData?.user?.accessToken || "");
  function Addbookfunc(id: string, TOKEN: string) {
    addBookMark({ id, TOKEN }).unwrap();
  }

  const isVerified = SessionData?.user?.verified || status === "authenticated";

  const {
    data: jobsData,
    isLoading: jobsIsLoading,
    error: jobsError,
    isError: jobIsError,
  } = useGetAllJobsQuery();
  const load = jobsData?.data;

  return (
    <main className="px-5 pb-7">
      <div className="flex md:flex-row flex-col justify-between p-4">
        <div>
          <h1 className="font-[900] text-xl md:text-4xl text-[#25324B] pb-1">
            Opportunities
          </h1>
          <h2 className="text-[#7C8493]">
            Showing {load?.length ?? 0} results
          </h2>
        </div>
        <div>
          <form>
            <label htmlFor="job_filter" className="text-[#7C8493]">
              Sort by:{" "}
            </label>
            <select id="job_filter" name="job_filter_name">
              <option value="Most relevant">Most relevant</option>
              <option value="recent">recent</option>
            </select>
          </form>
        </div>
      </div>
      <div>
        {(isRemoveLoading ||
          jobsIsLoading ||
          isBookMarkLoading ||
          IsAddLoading) && <Spinner />}
        {jobIsError ? (
          <p className="text-center">
            Error <span className="text-red-400 ">{jobsData?.error}</span>
          </p>
        ) : (
          <div className="gap-y-8 flex flex-col">
            {load?.map((value, ind) => {
              return (
                <Link key={ind} href={`jobdetail/${value.id}`}>
                  <JobCard
                    isVerifiedUser={isVerified}
                    isLoadingJobMark={false}
                    categories={value.categories}
                    company={value.orgName}
                    description={value.description}
                    imgUrl={`${value.logoUrl}`}
                    location={value.location[0]}
                    title={value.title}
                    isBookmarked={
                      bookMarkData?.data?.find(
                        (val) => val.eventID === value.id
                      ) !== undefined
                    }
                    onType={value.opType}
                    addBookMark={() => {
                      Addbookfunc(
                        value.id,
                        SessionData?.user?.accessToken || ""
                      );
                    }}
                    removeBookMark={() => {
                      removeBookMark({
                        id: value.id,
                        TOKEN: SessionData?.user?.accessToken || "",
                      }).unwrap();
                    }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
