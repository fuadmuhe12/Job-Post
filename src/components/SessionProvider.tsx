"use client";
import React from "react";
import { SessionProvider as SessionP } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return <SessionP>{children}</SessionP>;
}
