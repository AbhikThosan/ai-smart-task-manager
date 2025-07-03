import { Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store";
import { openTaskForm } from "@/store/slices/uiSlice";

interface NoTasksPlaceholderProps {
  isFiltered?: boolean;
}

export function NoTasksPlaceholder({
  isFiltered = false,
}: NoTasksPlaceholderProps) {
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(openTaskForm());
  };

  if (isFiltered) {
    return (
      <div className="text-center py-12">
        <Empty
          description="No tasks match your current filters"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Empty
        description="You haven't created any tasks yet"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddTask}
          size="large"
        >
          Create Your First Task
        </Button>
      </Empty>
    </div>
  );
}
