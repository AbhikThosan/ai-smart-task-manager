"use client";

import { Layout } from "antd";
import { HeaderTitle } from "./HeaderTitle";
import { HeaderActions } from "./HeaderActions";

const { Header: AntHeader } = Layout;

export function Header() {
  return (
    <AntHeader className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 px-4 sm:px-6 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 sm:h-20">
        <HeaderTitle />
        <HeaderActions />
      </div>
    </AntHeader>
  );
}
