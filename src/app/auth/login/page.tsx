"use client";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function Login({}: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register } = useForm();
  const { data, status } = useSession();
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
    <div className="flex flex-col justify-center items-center h-screen max-w-[409px] m-auto gap-y-6">
      <h1 className="font-[900] text-4xl text-[#202430]">Welcome Back!</h1>
      <div className="flex justify-between w-full">
        <div className="w-[109px] h-[1px] bg-[#D6DDEB]"></div>
        <div className="w-[109px] h-[1px] bg-[#D6DDEB]"></div>
      </div>
      <form
        action={async (formdata) => {
          setErrorMessage(null);
          const data = {
            email: formdata.get("email"),
            password: formdata.get("password"),
          };
          const res = await signIn("akil-login", { ...data, redirect: false , callbackUrl: "/"});
          if (res?.error) {
            setErrorMessage(res.error);
          }
        }}
        className="flex flex-col gap-y-[22px]"
      >
        <div className="flex flex-col">
          <label className="font-semibold  text-[#515B6F] pb-2" htmlFor="email">
            Email Address
          </label>
          <input
            {...register("email", { required: true })}
            data-id="email_input"
            name="email"
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="email"
            required={true}
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            data-id="password_input"
            name="password"
            required={true}
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="pt-11" id="login_submit">
          <Button buttonName="Continue"  data-id="login_submit"/>
        </div>
      </form>
      {errorMessage && (
        <div className="bg-red-200 w-full min-h-9 text-center rounded-sm flex justify-center items-center my-4">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
      <div>
        <p className="font-normal text-[#202430a2]">
          Don’t have an account?{" "}
          <Link href={"/auth"} className="text-[#4540deda]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
