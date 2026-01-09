"use client";

import { ConfigProvider, App } from "antd";

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
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}

