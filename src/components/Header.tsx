"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  const currentPath = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && data.user?.verified) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status, data]);

  console.log(data, status, "data and status in header");
  return (
    <main className="no-scrollbar">
      <header>
        <nav className="bg-neutral-100 flex flex-col gap-y-6 sm:flex-row  justify-between items-center sm:min-h-20 my-auto px-4 scroll-smooth ">
          <div>
            <Image src={"/akil-logo.png"} alt="Logo" width={70} height={30} />
          </div>
          <div className="flex flex-col sm:flex-row gap-x-7">
            <Link href="/" id = "home_tab">
              <div
                className={`flex flex-col items-center justify-center gap-3 px-2  ${
                  currentPath === "/" ? "border-b-2  border-[#4640DE]" : ""
                } `}
              >
                <Image
                  src={"/icons/home.svg"}
                  alt="Home"
                  width={24}
                  height={24}
                />
                <p>Home</p>
              </div>
            </Link>

            <Link href="/markedJobs" id="myjob_tab">
              <div
                className={`flex flex-col items-center justify-center gap-3 px-2  ${
                  currentPath === "/markedJobs"
                    ? "border-b-2  border-[#4640DE]"
                    : ""
                }`}
              >
                <Image
                  src={"/icons/home.svg"}
                  alt="Home"
                  width={24}
                  height={24}
                />
                <p>My Jobs</p>
              </div>
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-x-5 items-center justify-center">
                <button
                  className="py-4 px-8 rounded-lg bg-[#4640DE] text-white h-fit"
                  onClick={async (e) => {
                    e.preventDefault();
                    await signOut();
                  }}
                >
                  Log Out
                </button>
                <div className="flex flex-col justify-center items-center gap-y-1">
                  <Image src="/user.png" alt="Profile" width={48} height={48} />
                  <p>{data?.user?.name}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-x-5 ">
                <Link
                data-id = "login_button"
                  href={"/auth/login"}
                  className="py-4 px-8 text-[#4640DE] rounded-lg  border-2 "
                >
                  Log In
                </Link>
                <Link
                  href={"/auth"}
                  className="py-4 px-8 rounded-lg bg-[#4640DE] text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
}
