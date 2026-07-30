"use client";

import { ReactNode } from "react";

import QueryProvider from "./QueryProvider";

import { ToastProvider } from "@/contexts/ToastContext";
import AntdProvider from "./AntdProvider";

interface Props {
  children: ReactNode;
}

export default function AppProvider({ children }: Props) {
  return (
    <AntdProvider>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </AntdProvider>
  );
}
