"use client";

import { Row, Col } from "antd";
import { useAppSelector } from "@/store";
import { selectFilteredTasks } from "@/store/slices/taskSlice";
import { TaskCard } from "./TaskCard";
import { TaskFilters } from "./TaskFilters";
import { NoTasksPlaceholder } from "@/components/ui/NoTasksPlaceholder";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export function TaskList() {
  const filteredTasks = useAppSelector(selectFilteredTasks);

  return (
    <div className="space-y-6">
      <TaskFilters />

      {filteredTasks.length === 0 ? (
        <NoTasksPlaceholder isFiltered={true} />
      ) : (
        <Row gutter={[16, 16]} className="mt-6">
          {filteredTasks.map((task) => (
            <Col key={task.id} xs={24} sm={12} lg={8} xl={6}>
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
