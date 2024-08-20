"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { sinupInputIds } from "@/types/types";
import Credentials from "next-auth/providers/credentials";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import useSess from "next-auth";
import Link from "next/link";
import React, { InputHTMLAttributes } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";

type Props = {};

function SingUp({}: Props) {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { register, handleSubmit } = useForm<sinupInputIds>();
  const { data, status } = useSession();
  console.log(data, status, "data, status from signup page");
  console.log(data);

  const onSubmit: SubmitHandler<sinupInputIds> = async (data) => {
    setErrorMessage(null);
    console.log("submitted", data);
    const res = await signIn("akil-signup", {
      redirect: false,
      name: data.fullname,
      email: data.emailaddress,
      password: data.mainPassword,
      confirmPassword: data.confirmPass,
      role: "user",
    });
    if (res?.error) {
      setErrorMessage(res.error);
    }
  };
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center text-3xl">
        Loading...
      </div>
    );
  }
  if (status === "authenticated" && data?.user?.verified) {
    redirect("/");
  }
  if (status === "authenticated" && !data?.user?.verified) {
    redirect("/auth/verify");
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-[415px] m-auto py-3">
      <div>
        <h1 className="font-[900] text-[32px] leading-9 text-center pb-6">
          Sign Up Today!
        </h1>
        <div
          className="flex px-4   max-w-md border w-[408px] justify-center gap-x-[10px] rounded-md py-3 cursor-pointer"
          onClick={async () => {
            await signIn("google");
          }}
        >
          <Image
            src="/icons/google.svg"
            alt="google icon"
            width={20}
            height={20}
          />
          <h1 className="font-bold text-[#4640DE]">Sign Up with Google</h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-x-[15px] my-6">
        <div className="leftSide w-[109px] h-[1px] bg-[#20243071]"></div>
        <h1 className="text-[#20243071]">Or Sign Up with Email</h1>
        <div className="rightSide w-[109px] h-[1px] bg-[#20243071]"></div>
      </div>
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor={"fullname"}
          >
            Full Name
          </label>
          <input
            {...register("fullname")}
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="text"
            placeholder="Enter your full name"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor="emailaddress"
          >
            Email Address
          </label>
          <input
            {...register("emailaddress")}
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="email"
            placeholder="Enter email address"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor="mainPassword"
          >
            Password
          </label>
          <input
            {...register("mainPassword")}
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor="confirmPass"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPass")}
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="password"
            placeholder="Enter password"
          />
        </div>
        <Button buttonName="Continue" />
      </form>
      {errorMessage && (
        <div className="bg-red-200 w-full min-h-9 text-center rounded-sm flex justify-center items-center my-5">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
      <div className="flex flex-col gap-y-6 mt-6">
        <p className="text-[#202430c6]">
          Already have an account?{" "}
          <Link
            className=" text-[#4540ded8] font-semibold"
            href={"/auth/login"}
          >
            Login
          </Link>
        </p>
        <p className="text-[#7C8493] text-sm">
          By clicking <span className="text-base">&rsquo;Continue&rsquo;</span>,
          you acknowledge that you have read and accepted our{" "}
          <span className="text-[#4540ded2] text-base">Terms of Service</span>{" "}
          and <span className="text-[#4540ded2] text-base">Privacy Policy</span>
          .
        </p>
      </div>
    </div>
  );
}

export default SingUp;
