import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Providers } from "./providers";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Task Manager",
  description:
    "AI-powered task management application with intelligent subtask suggestions",
  keywords: ["task management", "AI", "productivity", "Gemini", "Next.js"],
  authors: [{ name: "Smart Task Manager Team" }],
};

export async function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        suppressHydrationWarning={true}
        data-no-grammarly="true"
        data-no-grammarly-extension="true"
      >
        <ErrorBoundary>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#1677ff",
                  borderRadius: 6,
                  fontFamily: inter.style.fontFamily,
                },
                components: {
                  Button: {
                    borderRadius: 6,
                  },
                  Input: {
                    borderRadius: 6,
                  },
                  Card: {
                    borderRadius: 8,
                  },
                },
              }}
            >
              <Providers>{children}</Providers>
            </ConfigProvider>
          </AntdRegistry>
        </ErrorBoundary>
      </body>
    </html>
  );
}
