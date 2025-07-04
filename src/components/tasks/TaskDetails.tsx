"use client";
import dayjs from "dayjs";
import { Task } from "@/types/task";

export function TaskDetails({ task }: { task: Task }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        {task.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
        {task.dueDate && (
          <div
            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
              task.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Due: {dayjs(task.dueDate).format("MMM DD, YYYY")}
          </div>
        )}

        <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Created: {dayjs(task.createdAt).format("MMM DD, YYYY")}
        </div>
      </div>
    </div>
  );
}
