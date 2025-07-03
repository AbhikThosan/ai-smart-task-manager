"use client";

import { Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store";
import { deleteTask } from "@/store/slices/taskSlice";
import { Task } from "@/types/task";
import { openTaskForm } from "@/store/slices/uiSlice";

interface TaskActionsProps {
  task: Task;
}

export function TaskActions({ task }: TaskActionsProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteTask(task.id));
      message.success("Task deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete task");
    }
  };

  const handleEdit = () => {
    dispatch(openTaskForm(task.id));
  };

  return (
    <div className="flex space-x-2">
      <Button icon={<EditOutlined />} size="small" onClick={handleEdit} />
      <Popconfirm
        title="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} size="small" danger />
      </Popconfirm>
    </div>
  );
}
