"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import makeStore, { AppStore } from "@/lib/store/store";

import React from "react";

type Props = {
  children: ReactNode;
};

export default function StoreProvider({ children }: Props) {
  const ref = useRef<AppStore>();
  if (!ref.current) {
    ref.current = makeStore();
  }
  return <Provider store={ref.current}>{children}</Provider>;
}
