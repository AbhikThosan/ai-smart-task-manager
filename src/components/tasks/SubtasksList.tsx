"use client";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Task } from "@/types/task";

interface SubtasksListProps {
  task: Task;
}

export function SubtasksList({ task }: SubtasksListProps) {
  if (!task.subtasks || task.subtasks.length === 0) {
    return (
      <div className="mt-4">
        <div className="text-center py-8 px-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <ClockCircleOutlined className="text-2xl text-blue-500" />
          </div>
          <p className="text-gray-500 text-sm font-medium">No subtasks yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Click &quot;Suggest Subtasks&quot; to get AI-powered suggestions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-800 flex items-center">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
          Subtasks
        </h4>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {task.subtasks.length} {task.subtasks.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="space-y-2">
        {task.subtasks.map((subtask, index) => (
          <div
            key={index}
            className="group relative p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-400 flex items-center justify-center transition-all duration-200">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 group-hover:bg-blue-400 rounded-full transition-all duration-200"></div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm leading-relaxed text-gray-700 group-hover:text-gray-900 transition-all duration-200">
                  {subtask}
                </p>
              </div>

              <div className="flex-shrink-0 text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-200">
                {index + 1}
              </div>
            </div>

            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
