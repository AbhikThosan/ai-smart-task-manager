"use client";

import { Checkbox } from "antd";
import { useAppDispatch } from "@/store";
import { toggleTaskStatus } from "@/store/slices/taskSlice";
import { Task } from "@/types/task";

interface TaskCheckboxProps {
  task: Task;
}

export function TaskCheckbox({ task }: TaskCheckboxProps) {
  const dispatch = useAppDispatch();

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={task.status === "completed"}
        onChange={handleToggleStatus}
      />
      <span
        className={
          task.status === "completed" ? "line-through text-gray-500" : ""
        }
      >
        {task.title}
      </span>
    </div>
  );
}
