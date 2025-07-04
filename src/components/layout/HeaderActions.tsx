"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store";
import { openTaskForm } from "@/store/slices/uiSlice";

export function HeaderActions() {
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(openTaskForm(null));
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddTask}
        size="large"
        className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl px-3 sm:px-6 h-10 sm:h-12 font-semibold text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Add New Task</span>
      </Button>
    </div>
  );
}
