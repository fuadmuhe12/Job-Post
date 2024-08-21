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
import BookedJobCard from "@/components/BookedJobCard";
import Spinner from "@/components/spinner";

export default function MyJobs() {
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
  const { data, status } = useSession();
  const { data: bookMarkData, isLoading:isbookMarkLoading,isError:isBookMarkError } = useGetBookMarksQuery(
    data?.user?.accessToken || ""
  );
  function Addbookfunc(id: string, TOKEN: string) {
    addBookMark({ id, TOKEN }).unwrap();
  }
  console.log(bookMarkData);
  

  return (
    <main className="px-5 pb-7">
      <div className="flex md:flex-row flex-col justify-between p-4">
        <div>
          <h1 className="font-[900] text-xl md:text-4xl text-[#25324B] pb-1">
            Bookmarked Jobs
          </h1>
          <h2 className="text-[#7C8493]">
            Showing {bookMarkData?.data?.length ?? 0} results
          </h2>
        </div>
      </div>
      <div>
        {(isRemoveLoading|| isbookMarkLoading)&& <Spinner/>}
        {isBookMarkError ? (
          <p className="text-center">
            Error <span className="text-red-400 ">{bookMarkData?.errors}</span>
          </p>
        ) : (
          <div className="gap-y-8 flex flex-col">
            {bookMarkData?.data?.map((value, ind) => {
              return (
                <Link key={ind} href={`jobdetail/${value.eventID}`}>
                  <BookedJobCard
                    isLoadingJobMark={false}
                    company={value.orgName}
                    imgUrl={`${value.logoUrl}`}
                    location={value.location[0]}
                    title={value.title}
                    isBookmarked={
                      bookMarkData?.data?.find(
                        (val) => val.eventID === value.eventID
                      ) !== undefined
                    }
                    onType={value.opType}
                    addBookMark={() => {
                      Addbookfunc(value.eventID, data?.user?.accessToken || "");
                    }}
                    removeBookMark={() => {
                      removeBookMark({
                        id: value.eventID,
                        TOKEN: data?.user?.accessToken || "",
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
