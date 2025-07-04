"use client";

import { Suspense } from "react";
import { Layout } from "antd";
import { Header } from "@/components/layout/Header";
import { useAppSelector } from "@/store";
import { selectFilteredTasks } from "@/store/slices/taskSlice";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { TaskSection } from "@/components/tasks/TaskSection";
import { HydrationSafe } from "@/components/ui/HydrationSafe";

const { Content } = Layout;

export default function HomePage() {
  const tasks = useAppSelector(selectFilteredTasks);

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header />
      <Content className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Smart Task Manager
            </h1>
            <p className="text-gray-600">
              Organize your tasks with AI-powered subtask suggestions
            </p>
          </div>
          <HydrationSafe fallback={<LoadingSpinner />}>
            <ErrorBoundary
              fallback={<div>Something went wrong loading tasks</div>}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <TaskSection
                  title="Pending Tasks"
                  tasks={pendingTasks}
                  count={pendingTasks.length}
                />
                <TaskSection
                  title="Completed Tasks"
                  tasks={completedTasks}
                  count={completedTasks.length}
                />
              </Suspense>
            </ErrorBoundary>
          </HydrationSafe>
          <TaskFormModal />
        </div>
      </Content>
    </Layout>
  );
}
