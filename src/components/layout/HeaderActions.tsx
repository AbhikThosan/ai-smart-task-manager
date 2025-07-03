"use client";

import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store";
import { openTaskForm } from "@/store/slices/uiSlice";

export function HeaderActions() {
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(openTaskForm());
  };

  return (
    <Space>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddTask}
        className="flex items-center bg-blue-600 hover:bg-blue-700"
      >
        <span className="hidden sm:inline">Add New Task</span>
      </Button>
    </Space>
  );
}
