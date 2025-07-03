"use client";

import { useEffect } from "react";
import { Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="error"
        title="Something went wrong"
        subTitle={
          process.env.NODE_ENV === "development"
            ? error.message
            : "We're sorry, but something unexpected happened."
        }
        extra={[
          <Button
            key="retry"
            type="primary"
            icon={<ReloadOutlined />}
            onClick={reset}
          >
            Try Again
          </Button>,
          <Button key="home" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>,
        ]}
      />
    </div>
  );
}
