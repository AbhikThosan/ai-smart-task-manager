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
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <BulbOutlined className="text-2xl text-blue-600" />
        <Title level={4} className="!m-0 !text-gray-900">
          Smart Task Manager
        </Title>
      </div>
      {totalTasks > 0 && (
        <div className="hidden md:flex items-center space-x-2">
          <Text className="text-sm text-gray-600">
            {completedTasks} of {totalTasks} completed
          </Text>
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
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
