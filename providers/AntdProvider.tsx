"use client";

import { ConfigProvider, App } from "antd";

import { ReactNode } from "react";

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,

          colorPrimary: "#1677ff",
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
