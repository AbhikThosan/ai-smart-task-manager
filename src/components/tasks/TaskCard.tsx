"use client";

import { Card } from "antd";
import { Task } from "@/types/task";
import { TaskCheckbox } from "./TaskCheckbox";
import { TaskActions } from "./TaskActions";
import { TaskDetails } from "./TaskDetails";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      className={`shadow-sm hover:shadow-md transition-shadow duration-200 ${
        task.status === "completed"
          ? "border-green-200 bg-green-50"
          : "border-purple-200 bg-purple-50"
      } rounded-lg`}
      title={<TaskCheckbox task={task} />}
      extra={<TaskActions task={task} />}
    >
      <TaskDetails task={task} />
    </Card>
  );
}
