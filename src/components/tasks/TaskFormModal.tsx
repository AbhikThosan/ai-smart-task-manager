"use client";

import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectIsTaskFormOpen,
  closeTaskForm,
  selectEditingTaskId,
} from "@/store/slices/uiSlice";
import { TaskFormFields } from "./TaskFormFields";
import { TaskFormActions } from "./TaskFormActions";
import { Form } from "antd";
import { addTask, updateTask } from "@/store/slices/taskSlice";
import { TaskFormData, Task } from "@/types/task";
import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { selectTasks } from "@/store/slices/taskSlice";

interface TaskFormValues {
  title: string;
  description: string;
  dueDate: Dayjs | null;
}

export function TaskFormModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsTaskFormOpen);
  const editingTaskId = useAppSelector(selectEditingTaskId);
  const tasks = useAppSelector(selectTasks);
  const editingTask = tasks.find((task: Task) => task.id === editingTaskId);
  const [form] = Form.useForm<TaskFormValues>();

  useEffect(() => {
    if (editingTask) {
      const formValues: TaskFormValues = {
        title: editingTask.title,
        description: editingTask.description,
        dueDate:
          editingTask.dueDate && editingTask.dueDate !== null
            ? dayjs(editingTask.dueDate)
            : null,
      };

      console.log("Form values:", formValues);
      console.log("Due date dayjs object:", formValues.dueDate);
      console.log(
        "Is valid dayjs?",
        formValues.dueDate ? dayjs.isDayjs(formValues.dueDate) : "null"
      );

      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const handleCancel = () => {
    form.resetFields();
    dispatch(closeTaskForm());
  };

  const handleSubmit = (values: TaskFormValues) => {
    console.log("Form submission values:", values);
    console.log("Due date from form:", values.dueDate);

    const taskData: TaskFormData = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
    };

    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, updates: taskData }));
      toast.success("Task updated successfully!");
    } else {
      dispatch(addTask(taskData));
      toast.success("Task created successfully!");
    }
    form.resetFields();
    dispatch(closeTaskForm());
  };

  return (
    <Modal
      title={editingTask ? "Edit Task" : "Create New Task"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={(errorInfo) => console.log("Form failed:", errorInfo)}
        className="mt-4"
      >
        <TaskFormFields />
        <TaskFormActions form={form} />
      </Form>
    </Modal>
  );
}
