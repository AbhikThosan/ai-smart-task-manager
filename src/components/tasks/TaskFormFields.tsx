"use client";

import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { TextArea } = Input;

export function TaskFormFields() {
  return (
    <>
      <Form.Item
        label="Task Title"
        name="title"
        rules={[
          { required: true, message: "Please enter a task title" },
          { min: 3, message: "Title must be at least 3 characters" },
          { max: 100, message: "Title cannot exceed 100 characters" },
        ]}
      >
        <Input placeholder="Enter task title" maxLength={100} showCount />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter a task description" },
          { min: 10, message: "Description must be at least 10 characters" },
          { max: 500, message: "Description cannot exceed 500 characters" },
        ]}
      >
        <TextArea
          placeholder="Describe your task in detail"
          rows={4}
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item label="Due Date (Optional)" name="dueDate">
        <DatePicker
          className="w-full"
          placeholder="Select due date"
          disabledDate={(current) => {
            const dayJsCurrent = dayjs(current, "YYYY-MM-DD", true);
            const today = dayjs().startOf("day");
            return dayJsCurrent.isValid() && dayJsCurrent.isBefore(today);
          }}
          format="YYYY-MM-DD"
        />
      </Form.Item>
    </>
  );
}
