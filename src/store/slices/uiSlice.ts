import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isTaskFormOpen: boolean;
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  editingTaskId: string | null;
}

const initialState: UIState = {
  isTaskFormOpen: false,
  theme: "light",
  sidebarCollapsed: false,
  editingTaskId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openTaskForm: (state, action: PayloadAction<string | null>) => {
      state.isTaskFormOpen = true;
      state.editingTaskId = action.payload;
    },
    closeTaskForm: (state) => {
      state.isTaskFormOpen = false;
      state.editingTaskId = null;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const {
  openTaskForm,
  closeTaskForm,
  setTheme,
  toggleTheme,
  setSidebarCollapsed,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectIsTaskFormOpen = (state: { ui: UIState }) =>
  state.ui.isTaskFormOpen;
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectSidebarCollapsed = (state: { ui: UIState }) =>
  state.ui.sidebarCollapsed;
export const selectEditingTaskId = (state: { ui: UIState }) =>
  state.ui.editingTaskId;
