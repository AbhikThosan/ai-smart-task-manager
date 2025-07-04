"use client";

import { Card } from "antd";
import { Task } from "@/types/task";
import { TaskCheckbox } from "./TaskCheckbox";
import { TaskActions } from "./TaskActions";
import { TaskDetails } from "./TaskDetails";
import { SuggestSubtasksButton } from "./SuggestSubtasksButton";
import { SubtasksList } from "./SubtasksList";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      className={`shadow-lg hover:shadow-2xl transition-all duration-300 ${
        task.status === "completed"
          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
          : "border-blue-200 bg-gradient-to-br from-white to-blue-50"
      } rounded-xl sm:rounded-2xl border-2 overflow-hidden`}
      title={<TaskCheckbox task={task} />}
      extra={<TaskActions task={task} />}
      styles={{ body: { padding: "16px sm:20px md:24px" } }}
    >
      <TaskDetails task={task} />
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-800">
              AI Suggestions
            </h4>
          </div>
          <SuggestSubtasksButton task={task} />
        </div>
        <SubtasksList task={task} />
      </div>
    </Card>
  );
}
