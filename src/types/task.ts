export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string | null;
}

export interface TaskFilters {
  status: TaskStatus | "all";
  sortBy: "createdAt" | "dueDate" | "title";
  sortOrder: "asc" | "desc";
}

export interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;
}
