"use client";
import JobDetail from "@/components/jobDetail";
import { fetchJobById } from "@/lib/features/getJobs/jobSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { notFound } from "next/navigation";
import { useEffect } from "react";

interface props {
  params: { jobID: string };
}
export default function JobDetailPage({ params }: props) {
  const dispacher = useAppDispatch();
  const detailLoad = useAppSelector((state) => state.jobs);
  useEffect(() => {
    dispacher(fetchJobById(params.jobID));
    console.log("by id clalled", params.jobID)
  },[]);
console.log('rudding detail')
  return (
    <div>
      {detailLoad.loading ? (
        <h1>Loading...</h1>
      ) : detailLoad.error ? (
        <p>
          Error : <span>{detailLoad.error}</span>
        </p>
      ) : detailLoad.curJob ? (
        <JobDetail {...detailLoad.curJob} />
      ) : (
        <p>DetailPage</p>
      )}
    </div>
  );
}
