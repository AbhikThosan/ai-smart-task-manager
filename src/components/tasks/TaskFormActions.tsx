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
    <div className="flex justify-end space-x-2">
      <Button onClick={handleCancel} className="mr-2">
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        {isEditing ? "Update Task" : "Create Task"}
      </Button>
    </div>
  );
}
