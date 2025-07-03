"use client";

import { Row, Col, Typography } from "antd";
import { TaskCard } from "./TaskCard";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Task } from "@/types/task"; // Import Task type

const { Title } = Typography;

interface TaskSectionProps {
  title: string;
  tasks: Task[]; // Replace any[] with Task[]
  count: number;
}

export function TaskSection({ title, tasks, count }: TaskSectionProps) {
  return (
    <div className="mb-8">
      <Title level={4} className="flex items-center">
        <span
          className={
            title.includes("Pending") ? "text-blue-600" : "text-green-600"
          }
        >
          •
        </span>
        {title} ({count})
      </Title>
      {tasks.length === 0 ? (
        <div className="text-center py-4">No tasks available</div>
      ) : (
        <Row gutter={[16, 16]} className="mt-4">
          {tasks.map((task) => (
            <Col key={task.id} xs={24} sm={24} md={24} lg={24}>
              <ErrorBoundary fallback={<div>Error loading task</div>}>
                <TaskCard task={task} />
              </ErrorBoundary>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
