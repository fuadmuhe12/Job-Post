import { BookMarkComing } from "@/lib/types/types";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { link } from "fs/promises";
import Image from "next/image";
import { List } from "postcss/lib/list";
import Spinner from "./spinner";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
  imgUrl: string;
  title: string;
  description: string;
  company: string;
  location: string;
  categories: string[];
  isBookmarked: boolean;
  onType: string;
  removeBookMark: () => void;
  addBookMark: () => void;
  isLoadingJobMark: boolean;
  isVerifiedUser: boolean;
};

const JobCard = (props: Props) => {
  return (
    <div className="rounded-3xl border border-[#D6DDEB] md:justify-start  flex p-6 gap-x-3 flex-col md:flex-row justify-center items-center md:items-start">
      <div className=" w-20 flex-shrink-0 ">
        <Image src={props.imgUrl} alt="Logo" width={70} height={70} />
      </div>
      <div className="basis-5/6">
        <div className="pb-3 flex justify-between w-full">
          <div>
            <h1 className="font-semibold text-xl pb-1">{props.title}</h1>
            <div>
              <p className="font-normal text-[16px] text-gray-400">
                {props.company}{" "}
                <span className="inline-block bg-[#7C8493] w-1 h-1 rounded-full mx-[6px] my-[2px]"></span>
                {props.location}
              </p>
            </div>
          </div>
          <div>
            {props.isLoadingJobMark ? (
              <Spinner />
            ) : (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!props.isVerifiedUser){
                    signIn()
                  }
                  props.isBookmarked
                    ? props.removeBookMark()
                    : props.addBookMark();
                }}
              >
                <Image
                  src={
                    props.isBookmarked
                      ? "/icons/booked.svg"
                      : "/icons/unbooked.svg"
                  }
                  alt="book mark"
                  width={50}
                  height={50}
                  aria-label={
                    props.isBookmarked
                      ? "add to Bookmark "
                      : "Remove from BookMark"
                  }
                />
              </div>
            )}
          </div>
        </div>
        <p className="text-[#25324B] text-justify leading-6 pb-5">
          {props.description}
        </p>
        <div className="flex  gap-x-2 divide-solid divide-x-2">
          <div className="bg-[#56cdad1a] border rounded-full px-[6px] py-[10px] w-fit text-center text-[#56CDAD] ">
            <p className="text-xs font-semibold"> {props.onType}</p>
          </div>
          <div className="flex gap-x-2 pl-2">
            {props.categories.map((value, id) => {
              return (
                <div
                  key={id}
                  className="border border-[#FFB836] rounded-full px-[6px] py-[10px] w-fit text-center text-[#FFB836]"
                >
                  <p className="text-xs font-semibold">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
