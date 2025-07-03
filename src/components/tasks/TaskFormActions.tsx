"use client";

import { Button } from "antd";
import { useAppDispatch } from "@/store";
import { closeTaskForm } from "@/store/slices/uiSlice";
import { Form, FormInstance } from "antd"; 

interface TaskFormActionsProps {
  form: FormInstance; 
}

export function TaskFormActions({ form }: TaskFormActionsProps) {
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    form.resetFields();
    dispatch(closeTaskForm());
  };

  return (
    <Form.Item className="mb-0 flex justify-end space-x-2">
      <Button onClick={handleCancel} className="mr-2">
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        Create Task
      </Button>
    </Form.Item>
  );
}
