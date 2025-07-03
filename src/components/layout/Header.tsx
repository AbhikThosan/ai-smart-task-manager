"use client";

import { Layout } from "antd";
import { HeaderTitle } from "./HeaderTitle";
import { HeaderActions } from "./HeaderActions";

const { Header: AntHeader } = Layout;

export function Header() {
  return (
    <AntHeader className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <HeaderTitle />
        <HeaderActions />
      </div>
    </AntHeader>
  );
}
