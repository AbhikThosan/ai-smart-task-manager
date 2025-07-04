"use client";

import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeTaskForm, selectEditingTaskId } from "@/store/slices/uiSlice";

export function TaskFormActions() {
  const dispatch = useAppDispatch();
  const editingTaskId = useAppSelector(selectEditingTaskId);
  const isEditing = !!editingTaskId;

  const handleCancel = () => {
    dispatch(closeTaskForm());
  };

  return (
    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 gap-2">
      <Button onClick={handleCancel} className="order-2 sm:order-1">
        Cancel
      </Button>
      <Button type="primary" htmlType="submit" className="order-1 sm:order-2">
        {isEditing ? "Update Task" : "Create Task"}
      </Button>
    </div>
  );
}
