"use client";
import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/lib/features/getJobs/jobSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const load = useAppSelector((state) => state.jobs);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);
  return (
    <main className="px-5 pb-7">
      <div className="flex md:flex-row flex-col justify-between p-4">
        <div>
          <h1 className="font-[900] text-xl md:text-4xl text-[#25324B] pb-1">
            Opportunities
          </h1>
          <h2 className="text-[#7C8493]">Showing {load.jobs.length} results</h2>
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
        {load.loading ? (
          <p className="text-center">Looding....</p>
        ) : load.error ? (
          <p className="text-center">
            Error <span className="text-red-400 ">{load.error}</span>
          </p>
        ) : (
          <div className="gap-y-8 flex flex-col">
            {load.jobs.map((value, ind) => {
              return (
                <Link key={ind} href={`${value.id}`}>
                  <JobCard
                    categories={value.categories}
                    company={value.orgName}
                    description={value.description}
                    imgUrl={`${value.logoUrl}`}
                    location={value.location[0]}
                    title={value.title}
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
