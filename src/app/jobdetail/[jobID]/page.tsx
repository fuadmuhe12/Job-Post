"use client";
import JobDetail from "@/components/jobDetail";
import Spinner from "@/components/spinner";
import { useGetJobByIdQuery } from "@/lib/features/api/apiSlice";
import { fetchJobById } from "@/lib/features/getJobs/jobSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { notFound } from "next/navigation";
import { useEffect } from "react";

interface props {
  params: { jobID: string };
}
export default function JobDetailPage({ params }: props) {
  const detailLoad = useAppSelector((state) => state.jobs);
  const {
    isError: jobDetailISError,
    data: JobDetailData,
    isLoading: jobDetailIsLoading,
  } = useGetJobByIdQuery(params.jobID);

  return (
    <div>
      {jobDetailIsLoading && <Spinner />}
      {jobDetailISError ? (
        <p>
          Error : <span>{detailLoad.error}</span>
        </p>
      ) : JobDetailData?.data ? (
        <JobDetail {...JobDetailData?.data} />
      ) : (
        <p></p>
      )}
    </div>
  );
}
