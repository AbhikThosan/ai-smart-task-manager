import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "default",
  text = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: size === "large" ? 24 : 16 }} spin />
  );

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      <Spin indicator={antIcon} size={size} />
      {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
    </div>
  );
}
