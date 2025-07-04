import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import {
  Task,
  TaskState,
  TaskStatus,
  TaskFormData,
  TaskFilters,
} from "@/types/task";
import { v4 as uuidv4 } from "uuid";

const initialState: TaskState = {
  tasks: [],
  filters: {
    status: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskFormData>) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        status: TaskStatus.PENDING,
        dueDate: action.payload.dueDate,
        createdAt: now,
        updatedAt: now,
      };
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>
    ) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status =
          task.status === TaskStatus.PENDING
            ? TaskStatus.COMPLETED
            : TaskStatus.PENDING;
        task.updatedAt = new Date().toISOString();
      }
    },
    setFilters: (state, action: PayloadAction<Partial<TaskFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAllTasks: (state) => {
      state.tasks = [];
    },
    clearCompletedTasks: (state) => {
      state.tasks = state.tasks.filter(
        (task) => task.status !== TaskStatus.COMPLETED
      );
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setFilters,
  clearFilters,
  setLoading,
  setError,
  clearError,
  clearAllTasks,
  clearCompletedTasks,
} = taskSlice.actions;

export default taskSlice.reducer;

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;
export const selectFilters = (state: { tasks: TaskState }) =>
  state.tasks.filters;
export const selectIsLoading = (state: { tasks: TaskState }) =>
  state.tasks.isLoading;
export const selectError = (state: { tasks: TaskState }) => state.tasks.error;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    // Early return for empty tasks
    if (tasks.length === 0) {
      return [];
    }

    let filteredTasks = tasks;

    if (filters.status !== "all") {
      filteredTasks = tasks.filter((task) => task.status === filters.status);
    }

    // Only sort if we have tasks to sort
    if (filteredTasks.length > 0) {
      filteredTasks = [...filteredTasks].sort((a, b) => {
        const aValue = a[filters.sortBy as keyof Task];
        const bValue = b[filters.sortBy as keyof Task];

        // Handle null values for dueDate
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return filters.sortOrder === "asc" ? 1 : -1;
        if (bValue === null) return filters.sortOrder === "asc" ? -1 : 1;

        if (filters.sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filteredTasks;
  }
);
