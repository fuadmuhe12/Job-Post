"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && data.user?.verified) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status, data]);
  return (
    <main>
      <header>
        <nav>
          <div>
            <Image src={".akil-logo.png"} alt="Logo" />
          </div>
          <div>
            {/* navigation link  in next js */}

            <Link href="/">
              <div>
                <Image src={"./icons/home.svg"} alt="Home" />
                <p>Home</p>
              </div>
            </Link>
            {isAuthenticated && (
              <Link href="/markedJobs">
                <div>
                  <Image src={"./icons/home.svg"} alt="Home" />
                  <p>My Jobs</p>
                </div>
              </Link>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <div>
                <button>Log Out</button>
                <div>
                  <Image src="./user.png" alt="Profile" />
                  <p>{data?.user?.name}</p>
                </div>
              </div>
            ) : (
              <div>
                <button className="py-4 px-8 rounded-lg bg-[#4640DE]">
                  Log In
                </button>
                <button className="py-4 px-8 rounded-lg bg-[#4640DE]">Sign Up</button>
              </div>
            )}
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
}
