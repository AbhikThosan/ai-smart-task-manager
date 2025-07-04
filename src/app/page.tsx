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
    <Layout className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Content className="p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              Smart Task Manager
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Organize your tasks with AI-powered subtask suggestions. Boost
              your productivity with intelligent task breakdown.
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
