"use client";

import { Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store";
import { selectTasks } from "@/store/slices/taskSlice";

const { Title, Text } = Typography;

export function HeaderTitle() {
  const tasks = useAppSelector(selectTasks);
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalTasks = tasks.length;

  return (
    <div className="flex items-center space-x-3 sm:space-x-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl">
          <BulbOutlined className="text-lg sm:text-xl text-white" />
        </div>
        <Title
          level={3}
          className="!m-0 !text-gray-900 font-bold text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          Smart Task Manager
        </Title>
      </div>
      {totalTasks > 0 && (
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 bg-white/60 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-gray-200/50">
          <Text className="text-xs sm:text-sm font-medium text-gray-700">
            {completedTasks} of {totalTasks} completed
          </Text>
          <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{
                width:
                  totalTasks > 0
                    ? (completedTasks / totalTasks) * 100
                    : 0 + "%",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
