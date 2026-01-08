"use client";

import { ConfigProvider } from "antd";

export function AntdProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#223f99",
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

