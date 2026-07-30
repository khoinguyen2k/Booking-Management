"use client";

import { createContext, ReactNode, useContext } from "react";

import { App } from "antd";

interface ToastContextType {
  success: (message: string) => void;

  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { message } = App.useApp();

  return (
    <ToastContext.Provider
      value={{
        success: message.success,

        error: message.error,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
