"use client";

import { Tag } from "antd";
import dayjs from "dayjs";
import { Task } from "@/types/task";

export function TaskDetails({ task }: { task: Task }) {
  return (
    <div className="space-y-2">
      <p className="text-gray-600">{task.description}</p>
      {task.dueDate && (
        <Tag color={task.status === "completed" ? "green" : "blue"}>
          Due: {dayjs(task.dueDate).format("MMM DD, YYYY")}
        </Tag>
      )}
      <p className="text-xs text-gray-400">
        Created: {dayjs(task.createdAt).format("MMM DD, YYYY HH:mm")}
      </p>
    </div>
  );
}
