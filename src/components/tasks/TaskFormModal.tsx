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

  const handleCancel = () => {
    dispatch(closeTaskForm());
  };

  const handleSubmit = (values: TaskFormValues) => {
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
    dispatch(closeTaskForm());
  };

  return (
    <Modal
      title={editingTask ? "Edit Task" : "Create New Task"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width="90vw"
      style={{ maxWidth: 600 }}
      destroyOnHidden
      className="sm:max-w-lg md:max-w-xl lg:max-w-2xl"
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
        className="mt-4"
        initialValues={
          editingTask
            ? {
                title: editingTask.title,
                description: editingTask.description,
                dueDate:
                  editingTask.dueDate && editingTask.dueDate !== null
                    ? dayjs(editingTask.dueDate)
                    : null,
              }
            : undefined
        }
      >
        <TaskFormFields />
        <Form.Item className="mb-0">
          <TaskFormActions />
        </Form.Item>
      </Form>
    </Modal>
  );
}
