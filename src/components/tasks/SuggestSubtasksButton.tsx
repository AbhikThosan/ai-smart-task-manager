"use client";

import { Button, Spin } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { updateSubtasks } from "@/store/slices/taskSlice";
import { Task } from "@/types/task";
import toast from "react-hot-toast";

interface SuggestSubtasksButtonProps {
  task: Task;
}

export function SuggestSubtasksButton({ task }: SuggestSubtasksButtonProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestSubtasks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/suggest-subtasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskTitle: task.title,
          taskDescription: task.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate subtasks");
      }

      const data = await response.json();

      if (data.subtasks && Array.isArray(data.subtasks)) {
        dispatch(updateSubtasks({ id: task.id, subtasks: data.subtasks }));
        toast.success(`Generated ${data.subtasks.length} subtasks!`);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating subtasks:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate subtasks. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="dashed"
      size="small"
      icon={isLoading ? <Spin size="small" /> : <BulbOutlined />}
      onClick={handleSuggestSubtasks}
      disabled={isLoading}
      className="text-blue-600 border-blue-300 hover:border-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
    >
      <span className="hidden sm:inline">
        {isLoading ? "Generating..." : "Suggest Subtasks"}
      </span>
      <span className="sm:hidden">{isLoading ? "..." : "Suggest"}</span>
    </Button>
  );
}
