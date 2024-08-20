"use client";
import Button from "@/components/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const VerificationCodeInput = () => {
  const { data, status, update } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 0) {
          clearInterval(interval);
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [code, setCode] = useState<string[]>(["", "", "", ""]);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if (isNaN(Number(value))) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  if (status === "authenticated" && data?.user?.verified) {
    redirect("/");
  }
  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  return (
    <main className="h-screen m-auto flex justify-center">
      <div className="max-w-[409px] m-auto flex flex-col gap-y-11">
        <div className="topside flex flex-col gap-11">
          <h1 className="font-[900] text-3xl text-[#25324B] text-center">
            Verify Email
          </h1>
          <p className="text-[#7C8493] text-sm leading-5">
            We&apos;ve sent a verification code to the email address you
            provided. To complete the verification process, please enter the
            code here.
          </p>
        </div>
        <form
          action={async (fomrdata) => {
            setErrorMessage(null);
            let submited = [];
            for (let i = 0; i < 4; i++) {
              submited.push(fomrdata.get(`code_${i}`));
            }
            const res = await signIn("verify", {
              email: data?.user?.email,
              otp: submited.join(""),
              redirect: false,
            });

            if (res?.error) {
              setErrorMessage(res.error);
            }
          }}
        >
          <div className="flex flex-col gap-y-5">
            <div className="flex gap-x-9 pt-10">
              {code.map((num, index) => (
                <input
                  placeholder="0"
                  name={`code_${index}`}
                  key={index}
                  type="text"
                  maxLength={1}
                  value={num}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputs.current[index] = el;
                  }}
                  className="h-[50px] caret-gray-400 caret w-[70px] bg-[#F8F8FD] rounded-md outline-[#4540de89] text-4xl font-medium text-center   outline-none placeholder:m-auto placeholder:font-medium placeholder:text-4xl placeholder:text-center pt-2"
                />
              ))}
            </div>
            {errorMessage && (
              <div className="bg-red-200 w-full min-h-9 text-center rounded-sm flex justify-center items-center my-4">
                <p className="text-red-500">{errorMessage}</p>
              </div>
            )}
            <p className="text-center">
              You can request to{" "}
              <span className="font-semibold text-[#4540dec4]">
                Resend code
              </span>{" "}
              in <br />
              <span className="font-semibold text-[#4540dec4]">
                {" "}
                0:{timeLeft}
              </span>{" "}
            </p>
          </div>
          <div className="pt-11">
            <Button buttonName="Continue" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default VerificationCodeInput;
