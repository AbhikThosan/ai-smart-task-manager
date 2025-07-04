"use client";

import { Typography } from "antd";
import { TaskCard } from "./TaskCard";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Task } from "@/types/task";

const { Title } = Typography;

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  count: number;
}

export function TaskSection({ title, tasks, count }: TaskSectionProps) {
  const isPending = title.includes("Pending");

  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              isPending
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-gradient-to-r from-green-500 to-emerald-500"
            }`}
          ></div>
          <Title
            level={3}
            className="!m-0 !text-gray-900 font-bold text-lg sm:text-xl md:text-2xl"
          >
            {title}
          </Title>
          <div
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ml-1 ${
              isPending
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {count}
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-white/50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-gray-400 text-base sm:text-lg font-medium">
            No {title.toLowerCase()} available
          </div>
          <div className="text-gray-400 text-xs sm:text-sm mt-2">
            Create your first task to get started
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {tasks.map((task) => (
            <ErrorBoundary
              key={task.id}
              fallback={<div>Error loading task</div>}
            >
              <div className="mb-4">
                <TaskCard task={task} />
              </div>
            </ErrorBoundary>
          ))}
        </div>
      )}
    </div>
  );
}
